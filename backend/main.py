from io import BytesIO
import json
from fastapi import FastAPI, UploadFile
from starlette.responses import FileResponse
from io import BytesIO
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware
from compute.autoEDA import generate_corr_matrix
import pandas as pd

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


@app.get("/")
async def root():
    return {"message": "Hello World"}


# please don't remove this endpoint, it can be used to check if the fe connection with be is working
@app.get("/api/python")
async def root():
    return {"message": "Hello from fastAPI backend"}


@app.put("/api/upload")
async def upload(file: UploadFile, filename):
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")
        content = await file.read()
        blob.upload_from_string(content)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"message": "Data uploaded to Gcloud successfuly"}


@app.get("/api/datasets")
async def getDataSets():
    dataSetNames = []
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        blobs = storage_client.list_blobs(DATA_BUCKET)
        for blob in blobs:
            dataSetNames.append(blob.name)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"names": dataSetNames}


@app.get("/api/data")
async def getData(filename):
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json(
            "../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")

        with blob.open("r") as f:
            dataSetLines = f.read()

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": dataSetLines}


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

        corrMatrix = generate_corr_matrix(byte_stream)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": corrMatrix}

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

