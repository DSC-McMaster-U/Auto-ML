from fastapi import FastAPI, File, UploadFile
from typing import Dict, Any, List
import csv
from io import StringIO
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

data = []
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


@app.get("/api/python")
async def root():
    return {"message": "Hello from fastAPI backend"}


@app.get("/api/dataset")
async def getData():
    return data


@app.post("/api/dataset")
def upload(json_data: List[Dict[Any, Any]]):
    for i in json_data:
        data.append(i)


# def upload(file: UploadFile):  # Initialize data as a dictionary

#     if not file:
#         return {"message": "No upload file sent"}
#     try:
#         contents = file.file.read()
#         print(contents)

#         # with StringIO(contents.decode('utf-8')) as buffer:
#         #     csvReader = csv.DictReader(buffer)

#         #     for row in  csvReader:
#         #         # key = row.get('Id')  # Assuming a column named 'Id' to be the primary key
#         #         data.append(row)

#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

#     finally:
#         file.file.close()

#     print(data)
#     return data


@app.put("/api/uploadset")
async def uploadSet(file: UploadFile):
    try:
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        bucket = storage_client.get_bucket("data-test-automate-ml")
        blob = bucket.blob(file.filename)
        content = await file.read()
        blob.upload_from_string(content)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"message": "Data uploaded to Gcloud successfuly"}


@app.get("/api/getsets")
async def retrieveSets():
    dataSetNames = []
    try:
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        blobs = storage_client.list_blobs("data-test-automate-ml")
        for blob in blobs:
            dataSetNames.append(blob.name)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"names": dataSetNames}


@app.get("/api/getset")
async def retrieveSet():
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        bucket = storage_client.get_bucket("data-test-automate-ml")
        blob = bucket.blob("data.csv")

        with blob.open("r") as f:
            dataSetLines = f.read()

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": dataSetLines}
