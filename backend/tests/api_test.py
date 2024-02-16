import requests
import pytest

BASE_URL = "http://127.0.0.1:8000"

def test_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200

def test_python():
    response = requests.get(f"{BASE_URL}/api/python")
    assert response.status_code == 200

def test_datasets():
    response = requests.get(f"{BASE_URL}/api/datasets")
    assert response.status_code == 200

def test_bigquery():
    response = requests.get(f"{BASE_URL}/api/bq?filename=sample_contacts")
    assert response.status_code == 200

def test_get_data():
    response = requests.get(f"{BASE_URL}/api/data?filename=data")
    assert response.status_code == 200

def test_automl():
    response = requests.get(f"{BASE_URL}/api/automl")
    assert response.status_code == 200

def test_upload_data():
    url = f"{BASE_URL}/api/upload?filename=test-data"
    files = {'file': ('data.csv', open('data.csv', 'rb'), 'text/csv')}
    response = requests.put(url, files=files)
    assert response.status_code == 200

def test_eda():
    response = requests.get(f"{BASE_URL}/api/eda?filename=data")
    assert response.status_code == 200
