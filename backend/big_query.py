from google.cloud import storage
from google.cloud import bigquery

DATA_BUCKET = "automate-ml-datasets"
BQ_DATASET = "automl_dataset_1"

def query_table(bq_client, table_id, query):
  query = query.upper() if query else None
  
  # List of potentially harmful operations
  harmful_ops = ['DROP', 'DELETE', 'INSERT', 'UPDATE']

  # Check if the query contains any harmful operations
  if query and any(op in query.upper() for op in harmful_ops):
      print("\nQuery contains harmful operations!\nusing default query.\n")
      final_query = f"SELECT * FROM `{table_id}`"
  else:
      print("\nQuery is safe to be passed.\n")
      # remove everything before the `SELECT` keyword from the received query
      query = query[query.find("SELECT"):] if query else None
      final_query = query.replace("FROM TABLE", f"FROM `{table_id}`") if query else f"SELECT * FROM `{table_id}`"
  print("Final Query:\n", final_query, "\n")
  
  query_job = bq_client.query(final_query)
  rows = query_job.result()

  # display the rows
  data = []
  for row in rows:
      data.append(dict(row))

  return {"message": f"Loaded {table_id} with {rows.total_rows} rows.", "data": data}

# load the table from the bucket to bigquery and perform the query
def bq_ops(fileName, query=None):  
  # construct client objects (authorized with the service account json file)
  bq_client = bigquery.Client.from_service_account_json("./credentials.json")
  storage_client = storage.Client.from_service_account_json("./credentials.json")
  
  # check if the file name has .csv extension, if not, add it
  # if not fileName.endswith('.csv'):
  #     fileName += '.csv'
  
  uri = f"gs://{DATA_BUCKET}/{fileName}"
  
  # if file does not exist in the bucket, return an error
  blob = storage_client.get_bucket(DATA_BUCKET).blob(fileName)
  if not blob.exists():
      return {"error": f"File {fileName} does not exist in the bucket."}
  
  fileName = fileName.replace('.csv', '')
  table_id = f"{BQ_DATASET}.{fileName}_table"
  
  # if table does not exist, load it
  # try:
  #     bq_client.get_table(table_id)
  # except:
  job_config = bigquery.LoadJobConfig(
      autodetect=True,  # Automatically infer the schema.
      source_format=bigquery.SourceFormat.CSV,
      skip_leading_rows=1,  # column headers
      write_disposition=bigquery.WriteDisposition.WRITE_TRUNCATE,  # Overwrite the table
  )
  # Make an API request
  load_job = bq_client.load_table_from_uri(
      uri, table_id, job_config=job_config
  )
  # Waits for the job to complete.
  load_job.result() 
  
  # call the query_table function to perform the query
  return query_table(bq_client, table_id, query)
