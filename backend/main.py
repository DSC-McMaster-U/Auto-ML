from fastapi import FastAPI, UploadFile
from google.cloud import storage
from fastapi.middleware.cors import CORSMiddleware

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
async def upload(file: UploadFile, fileName):
    try:
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{fileName}.csv")
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
async def getData(fileName):
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json("../credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{fileName}.csv")

        with blob.open("r") as f:
            dataSetLines = f.read()

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": dataSetLines}
