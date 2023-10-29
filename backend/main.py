from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/python")
async def root():
    return {"message": "Hello from fastAPI backend"}