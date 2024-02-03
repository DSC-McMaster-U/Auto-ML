from io import BytesIO
import json
import os
from fastapi import FastAPI, UploadFile
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware
from compute.autoEDA import generate_eda

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
        storage_client = storage.Client.from_service_account_json("../credentials.json")

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
        storage_client = storage.Client.from_service_account_json("../credentials.json")

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
        storage_client = storage.Client.from_service_account_json("../credentials.json")

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
        storage_client = storage.Client.from_service_account_json("../credentials.json")

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
