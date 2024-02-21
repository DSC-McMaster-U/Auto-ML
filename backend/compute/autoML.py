# from pycaret.classification import setup as classification_setup, compare_models as classification_compare_models, finalize_model
# from pycaret.regression import setup as regression_setup, compare_models as regression_compare_models, finalize_model

import pycaret.classification as pycaret_cl
import pycaret.regression as pycaret_rg

import pandas as pd
import joblib

def perform_classification(data, target_column):

    pycaret_cl.setup(data = data, target = target_column)
    best_model = pycaret_cl.compare_models()

    model_file_path = 'classification_model.pkl'
    joblib.dump(best_model, model_file_path)

    return best_model, model_file_path

def perform_regression(data, target_column):

    pycaret_rg.setup(data = data, target = target_column)
    best_model = pycaret_rg.compare_models()

    model_file_path = 'regression_model.pkl'
    joblib.dump(best_model, model_file_path)

    return best_model, model_file_path

def generate_model(data, target_column, task):
    
    df = pd.read_csv(data) # Supplied dataset
    task = task.upper() # Either R or C
    
    if task == 'C':
        perform_classification(df, target_column)  # Call classification_setup() before classification_compare_models()
        final_model, model_file_path = perform_classification(df, target_column)
    elif task == 'R':
        perform_regression(df, target_column)  # Call regression_setup() before regression_compare_models()
        final_model, model_file_path = perform_regression(df, target_column)

    return final_model, model_file_path

