from pycaret.classification import setup as classification_setup, compare_models as classification_compare_models, finalize_model
from pycaret.regression import setup as regression_setup, compare_models as regression_compare_models, finalize_model
import pandas as pd
import joblib

def perform_classification(data, target_column):

    classification_setup(data = data, target = target_column)
    best_model = classification_compare_models()
    final_model = finalize_model(best_model)

    model_file_path = 'classification_model.pkl'
    joblib.dump(final_model, model_file_path)

    return final_model, model_file_path

def perform_regression(data, target_column):

    regression_setup(data = data, target = target_column)
    best_model = regression_compare_models()
    final_model = finalize_model(best_model)

    model_file_path = 'regression_model.pkl'
    joblib.dump(final_model, model_file_path)

    return final_model, model_file_path

def get_model(data, target_column, task):
    
    data = data # Supplied dataset
    target_column = target_column
    task = task.upper() # Either R or C
    
    if task == 'C':
        final_model, model_file_path = perform_classification(data, target_column)
    elif task == 'R':
        final_model, model_file_path = perform_regression(data, target_column)

    return final_model, model_file_path
