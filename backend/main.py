from http.client import HTTPException
from google.cloud import storage
from starlette.responses import FileResponse
from io import BytesIO, StringIO
import pandas as pd
import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi import HTTPException
from fastapi.responses import StreamingResponse, HTMLResponse


# custom functions for EDA and AutoML
from compute.autoEDA import profile
from compute.autoML import generate_model

# from big_query import bq_ops


import csv

app = FastAPI()

DATA_BUCKET = "automate-ml-datasets"
GRAPH_BUCKET = "automate_ml_graphs"
MODEL_BUCKET = "automl_gdsc_models"
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
# @app.get("/api/eda")
# async def eda(fileName):
#     corrMatrix = ""
#     try:
#         storage_client = storage.Client.from_service_account_json("./credentials.json")

#         bucket = storage_client.get_bucket(DATA_BUCKET)
#         blob = bucket.blob(f"{fileName}.csv")

#         byte_stream = BytesIO()
#         blob.download_to_file(byte_stream)
#         byte_stream.seek(0)

#         corrMatrix, uniqueFilename = generate_eda(byte_stream)

#         # Upload the PNG file to GCS
#         bucket = storage_client.get_bucket(GRAPH_BUCKET)
#         graph_blob = bucket.blob(uniqueFilename)
#         graph_blob.upload_from_filename(f"tempImages/{uniqueFilename}")

#         # Get the public URL
#         public_url = graph_blob.public_url

#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

#     finally:
#         # Delete the temporary file
#         if os.path.exists(f"tempImages/{uniqueFilename}"):
#             os.remove(f"tempImages/{uniqueFilename}")

#     return {"data": corrMatrix, "graph_url": public_url}


# EDA profile
@app.get("/api/eda-profile")
async def getProfile(fileName):
    uniqueFilename = ""
    html_content = ""
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{fileName}")

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        uniqueFilename = profile(byte_stream)

        with open(f"tempHTML/{uniqueFilename}", "r") as file:
            html_content = file.read()

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    finally:
        # Delete the temporary file
        if os.path.exists(f"tempHTML/{uniqueFilename}"):
            os.remove(f"tempHTML/{uniqueFilename}")

    return HTMLResponse(content=html_content, status_code=200)


# EDA Nulls
# @app.get("/api/get-nulls")
# async def nulls(fileName):
#     nulls = 0
#     try:
#         storage_client = storage.Client.from_service_account_json("./credentials.json")

#         bucket = storage_client.get_bucket(DATA_BUCKET)
#         blob = bucket.blob(fileName)

#         nulls = get_nulls(blob)

#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

#     return {"nulls": nulls}


# EDA Distribution Plot
# @app.get("/api/get-dist")
# async def edaDistributions(fileName):
#     corrMatrix = ""
#     try:
#         storage_client = storage.Client.from_service_account_json("./credentials.json")

#         bucket = storage_client.get_bucket(DATA_BUCKET)
#         blob = bucket.blob(f"{fileName}.csv")

#         byte_stream = BytesIO()
#         blob.download_to_file(byte_stream)
#         byte_stream.seek(0)

#         uniqueFilename = get_distributions(byte_stream)

#         # Upload the PNG file to GCS
#         bucket = storage_client.get_bucket(GRAPH_BUCKET)
#         graph_blob = bucket.blob(uniqueFilename)
#         graph_blob.upload_from_filename(f"tempImages/{uniqueFilename}")

#         # Get the public URL
#         public_url = graph_blob.public_url

#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

#     finally:
#         # Delete the temporary file
#         if os.path.exists(f"tempImages/{uniqueFilename}"):
#             os.remove(f"tempImages/{uniqueFilename}")

#     return {"graph_url": public_url}


# # EDA Types
# @app.get("/api/get-types")
# async def eda(fileName):
#     try:
#         # TODO

#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

#     return {}


# start the automl process
@app.get("/api/generateModel")
async def getModel(fileName, column, task):
    try:

        storage_client = storage.Client.from_service_account_json("./credentials.json")

        data_bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = data_bucket.blob(f"{fileName}.csv")

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        # producing model
        model, model_file_path = generate_model(byte_stream, column, task)

        # upload model to model bucket
        model_bucket = storage_client.get_bucket(MODEL_BUCKET)
        model_blob = model_bucket.blob(f"{fileName}.pkl")
        with open(model_file_path, "rb") as model_file:
            model_blob.upload_from_file(
                model_file, content_type="application/octet-stream"
            )

        return fileName, column, task

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


# retreive the model and download it
@app.get("/api/downloadModel")
async def downloadModel():
    try:
        # action
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        # retreiving the data from bucket
        bucket = storage_client.get_bucket(MODEL_BUCKET)
        blobs = list(bucket.list_blobs())
        blob = blobs[0]

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        # remove it from the bucket
        blob.delete()

        return StreamingResponse(byte_stream, media_type="application/octet-stream")

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


# big query operations
"""
@app.get("/api/bq")
async def bq(fileName, query=None):
    try:
        result = bq_ops(fileName, query)
        return result
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
"""
