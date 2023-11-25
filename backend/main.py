from fastapi import FastAPI, File, UploadFile
import csv
from io import StringIO

app = FastAPI()

data = {}

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
def upload(file: UploadFile):  # Initialize data as a dictionary

    if not file:
        return {"message": "No upload file sent"}

    try:
        contents = file.file.read()

        with StringIO(contents.decode('utf-8')) as buffer:
            csvReader = csv.DictReader(buffer)

            for row in csvReader:
                key = row.get('Id')  # Assuming a column named 'Id' to be the primary key
                data[key] = row

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    finally:
        file.file.close()

    return data