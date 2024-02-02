from io import BytesIO
import json
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware
from compute.autoEDA import generate_corr_matrix

import csv
from io import StringIO

app = FastAPI()

DATA_BUCKET = "automate-ml-datasets"
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
        blob = bucket.blob(f"{fileName}")

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
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        corrMatrix = generate_corr_matrix(byte_stream)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": corrMatrix}
