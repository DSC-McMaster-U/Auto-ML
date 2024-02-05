from io import BytesIO
from google.cloud import storage
from google.cloud import bigquery
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from compute.autoEDA import generate_corr_matrix

import csv
from io import StringIO

app = FastAPI()

DATA_BUCKET = "automate-ml-datasets"
BQ_DATASET = "automl_dataset_1"
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
            "./credentials.json")

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
async def upload(file: UploadFile = File(...), fileName: str = Form(...)):
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        # Assuming fileName includes '.csv' extension
        blob = bucket.blob(f"{fileName}")
        content = await file.read()
        content_type = file.content_type if file.content_type else 'application/octet-stream'  # Set default content type if None
        blob.upload_from_string(content, content_type=content_type)

        await refreshDataSets()  # Make sure this function is defined if you want to use it

        return JSONResponse(status_code=200, content={"message": "Data uploaded to GCloud successfully"})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"An error occurred: {str(e)}"})

    return {"message": "Data uploaded to Gcloud successfuly"}

# list all the datasets in the bucket
@app.get("/api/datasets")
async def getDataSets():
    if not dataSetNames:
        return {"error": f"No DataSets in Bucket"}
    return {"names": dataSetNames}

# get the data from the bucket and return it as a string
@app.get("/api/data")
async def getData(filename):
    dataSetLines = ""
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")

        with blob.open("r") as f:
            dataSetLines = f.read()
            
        # convert dataSetLines to be of type str | None (#TODO - check if this is necessary)
        dataSetLines = str(dataSetLines) if dataSetLines else None 

        # convert csv string -> json (for frontend)
        csv_reader = csv.DictReader(StringIO(dataSetLines))
        json_data = [row for row in csv_reader]

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {
        "data": dataSetLines,
        "json": json_data
    }


# Exploratory Data Analysis
@app.get("/api/eda")
async def eda(filename):
    corrMatrix = ""
    try:
        storage_client = storage.Client.from_service_account_json("./credentials.json")

        bucket = storage_client.get_bucket(DATA_BUCKET)
        blob = bucket.blob(f"{filename}.csv")

        byte_stream = BytesIO()
        blob.download_to_file(byte_stream)
        byte_stream.seek(0)

        corrMatrix = generate_corr_matrix(byte_stream)

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    return {"data": corrMatrix}


# get file from bucket, load it to big query as a table & display the rows
@app.get("/api/bq")
async def bq(filename):
    # construct client objects (authorized with the service account json file)
    bq_client = bigquery.Client.from_service_account_json("./credentials.json")
    storage_client = storage.Client.from_service_account_json("./credentials.json")
    
    uri = f"gs://{DATA_BUCKET}/{filename}.csv"
    table_id = f"{BQ_DATASET}.{filename}_table"
    
    # if file does not exist in the bucket, return an error
    blob = storage_client.get_bucket(DATA_BUCKET).blob(filename + ".csv")
    if not blob.exists():
        return {"error": f"File {filename}.csv does not exist in the bucket."}
    
    # if table does not exist, load it
    try:
        bq_client.get_table(table_id)
    except:
        job_config = bigquery.LoadJobConfig(
            autodetect=True,  # Automatically infer the schema.
            source_format=bigquery.SourceFormat.CSV,
            skip_leading_rows=1,  # column headers
            write_disposition=bigquery.WriteDisposition.WRITE_TRUNCATE,  # Overwrite the table
        )
        
        load_job = bq_client.load_table_from_uri(
            uri, table_id, job_config=job_config
        ) # Make an API request.
        
        load_job.result()  # Waits for the job to complete.
    
    # Query all rows from the table
    query = f"SELECT * FROM `{table_id}`"
    query_job = bq_client.query(query)
    rows = query_job.result()
    
    # display the rows
    data = []
    for row in rows:
        data.append(dict(row))

    return {"message": f"Loaded {table_id} with {rows.total_rows} rows.", "data": data}
