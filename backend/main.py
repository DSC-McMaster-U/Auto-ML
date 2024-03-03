from http.client import HTTPException
from google.cloud import storage
from starlette.responses import FileResponse
from io import BytesIO, StringIO
import pandas as pd
import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# custom functions for EDA and AutoML
from compute.autoEDA import generate_eda
from compute.autoML import generate_model
from big_query import bq_ops


import csv

app = FastAPI()

DATA_BUCKET = "automate-ml-datasets"
GRAPH_BUCKET = "automate_ml_graphs"
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


""" state variable that stores all the current dataSets in bucket
    - this should reduce the number of gcp api calls for getting data
    - data is preloaded, so speeds up data retrieval as it doesn't have to wait for gcp
"""
dataSetNames = []


async def refreshDataSets():
    global dataSetNames
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        blobs = storage_client.list_blobs(DATA_BUCKET)
        dataSetNames = [blob.name for blob in blobs]

    except Exception as e:
        error = {"error": f"An error occurred: {str(e)}"}
        print(error)
        return error


@app.on_event("startup")
async def startup():

    # will fetch the state of the bucket
    await refreshDataSets()
    print("Fetched Data Sets:", dataSetNames)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/python")
async def root_py():
    return {"message": "Hello from fastAPI backend"}


# add a new dataset to the bucket
@app.put("/api/upload")
async def upload(fileName: str = Form(...), file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.filename.endswith(".csv"):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only CSV files are accepted.",
            )

        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{fileName}")
        blob.upload_from_file(file.file, content_type="text/csv")

        await refreshDataSets()  # Make sure this function is defined if you want to use it

        return JSONResponse(
            status_code=200, content={"message": "Data uploaded to GCloud successfully"}
        )

    except Exception as e:
        return JSONResponse(
            status_code=500, content={"error": f"An error occurred: {str(e)}"}
        )


# list all the datasets in the bucket
@app.get("/api/datasets")
async def getDataSets():
    # have to refresh the state of the bucket since it may have changed
    await refreshDataSets()
    if not dataSetNames:
        return {"error": f"No DataSets in Bucket"}
    return {"names": dataSetNames}


# get the data from the bucket and return it as a string
@app.get("/api/data")
async def getData(fileName):
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(fileName)

        with blob.open("r") as f:
            dataSetLines = f.read()

        # convert dataSetLines to be of type str | None (#TODO - check if this is necessary)
        dataSetLines = str(dataSetLines) if dataSetLines else None

        # convert csv string -> json (for frontend)
        csv_reader = csv.DictReader(StringIO(dataSetLines))
        json_data = [row for row in csv_reader]

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": dataSetLines, "json": json_data}


# Exploratory Data Analysis
@app.get("/api/eda")
async def eda(fileName):
    corrMatrix = ""
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{fileName}.csv")

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        corrMatrix, uniqueFilename = generate_eda(byte_stream)

        # Upload the PNG file to GCS
        bucket = storage_client.get_bucket(GRAPH_BUCKET)
        graph_blob = bucket.blob(uniqueFilename)
        graph_blob.upload_from_filename(f"tempImages/{uniqueFilename}")

        # Get the public URL
        public_url = graph_blob.public_url

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    finally:
        # Delete the temporary file
        if os.path.exists(f"tempImages/{uniqueFilename}"):
            os.remove(f"tempImages/{uniqueFilename}")

    return {"data": corrMatrix, "graph_url": public_url}


# return the model as a file
@app.get("/api/automl")
async def getModel():
    try:
        # From #172 rawan/pandas-read-bucket

        # storage_client = storage.Client.from_service_account_json(
        #     "./credentials.json")
        # bucket = storage_client.get_bucket("data-test-automate-ml")
        # blob = bucket.blob("fish_data.csv")
        # byte_stream = BytesIO()
        # blob.download_to_file(byte_stream)
        # byte_stream.seek(0)
        # df = pd.read_csv(byte_stream)

        model, model_path = generate_model("fish_data.csv","Species", "C")

        # Use a placeholder file for testing download
        # placeholder_model_path = "./download_test_random_data.pickle"

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    # Return the placeholder file

    # return FileResponse(path=placeholder_model_path, filename=placeholder_model_path.split("/")[-1], media_type='application/octet-stream')
    return FileResponse(path=model_path, filename=model_path.split("/")[-1], media_type='application/octet-stream')


# big query operations
@app.get("/api/bq")
async def bq(fileName, query=None):
    try:
        result = bq_ops(fileName, query)
        return result
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
