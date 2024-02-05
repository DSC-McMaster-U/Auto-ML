from io import BytesIO
import json
from starlette.responses import FileResponse
from io import BytesIO, StringIO
import pandas as pd
import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware
from compute.autoEDA import generate_eda
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
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

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


# please don't remove this endpoint, it can be used to check if the fe connection with be is working
@app.get("/api/python")
async def root():
    return {"message": "Hello from fastAPI backend"}


@app.put("/api/upload")
async def upload(file: UploadFile = File(...), fileName: str = Form(...)):
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        # Assuming fileName includes '.csv' extension
        blob = bucket.blob(f"{fileName}")
        content = await file.read()
        blob.upload_from_string(content, content_type=file.content_type)

        await refreshDataSets()  # Make sure this function is defined if you want to use it

        return JSONResponse(status_code=200, content={"message": "Data uploaded to GCloud successfully"})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"An error occurred: {str(e)}"})


@app.get("/api/datasets")
async def getDataSets():
    if not dataSetNames:
        return {"error": f"No DataSets in Bucket"}
    return {"names": dataSetNames}


@app.get("/api/data")
async def getData(filename):
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}")

        with blob.open("r") as f:
            dataSetLines = f.read()

        # convert csv string -> json (for frontend)
        csv_reader = csv.DictReader(StringIO(dataSetLines))
        json_data = [row for row in csv_reader]

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {
        "data": dataSetLines,
        "json": json_data
    }



@app.get("/api/eda")
async def eda(filename):
    corrMatrix = ""
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")

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

@app.get("/api/automl")
async def getModel():
    try:
        #From #172 rawan/pandas-read-bucket

        # storage_client = storage.Client.from_service_account_json(
        #     "../credentials.json")
        # bucket = storage_client.get_bucket("data-test-automate-ml")
        # blob = bucket.blob("fish_data.csv")
        # byte_stream = BytesIO()
        # blob.download_to_file(byte_stream)
        # byte_stream.seek(0)
        # df = pd.read_csv(byte_stream)
        # model_path = automl(df)


        # Use a placeholder file for testing download
        placeholder_model_path = "./download_test_random_data.pickle"

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    # Return the placeholder file
    return FileResponse(path=placeholder_model_path, filename=placeholder_model_path.split("/")[-1], media_type='application/octet-stream')

