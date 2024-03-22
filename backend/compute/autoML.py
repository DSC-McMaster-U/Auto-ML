# from pycaret.classification import setup as classification_setup, compare_models as classification_compare_models, finalize_model
# from pycaret.regression import setup as regression_setup, compare_models as regression_compare_models, finalize_model
import pycaret.classification as pycaret_cl
from pycaret.classification import *
import pycaret.regression as pycaret_rg

import pandas as pd
import joblib
import uuid
import matplotlib.pyplot as plt

def perform_classification(data, target_column):

    clf1 = pycaret_cl.setup(data = data, target = target_column)

    best_model = pycaret_cl.compare_models()

    model_file_path = 'classification_model.pkl'
    joblib.dump(best_model, model_file_path)

    #generating scoring/accuray grid
    dt = pycaret_cl.create_model('dt')
    dt_results = pycaret_cl.pull()
    scoring_grid_filename = f"scoring_grid_{uuid.uuid4()}.csv"
    dt_results.to_csv(scoring_grid_filename, index=False)

    #plotting model
    lr = pycaret_cl.create_model('lr')
    plot_filename = f"plot_{uuid.uuid4()}.png"
    plot_model = pycaret_cl.plot_model(lr, plot='auc', save='backend')

    return best_model, model_file_path, scoring_grid_filename, plot_filename

def perform_regression(data, target_column):
    #IMPLEMENT SAME FOR REGRESSION LATER

    pycaret_rg.setup(data = data, target = target_column)
    best_model = pycaret_rg.compare_models()

    model_file_path = 'regression_model.pkl'
    joblib.dump(best_model, model_file_path)

    #generating scoring/accuracy chart
    dt = pycaret_rg.create_model('dt')
    dt_results = pycaret_rg.pull()
    scoring_grid_filename = f"scoring_grid_{uuid.uuid4()}.csv"
    dt_results.to_csv(scoring_grid_filename, index=False)

    #plotting model
    lr = pycaret_rg.create_model('lr')
    plot_filename = f"plot_{uuid.uuid4()}.png"
    pycaret_rg.plot_model(lr, plot='auc', save=True, plot_name=plot_filename)

    return best_model, model_file_path, scoring_grid_filename, plot_filename

def generate_model(data, target_column, task):
    
    df = pd.read_csv(data) # Supplied dataset
    task = task.upper() # Either R or C
    
    if task == 'C':
        perform_classification(df, target_column)  # Call classification_setup() before classification_compare_models()
        final_model, model_file_path, scoring_grid_filename, plot_filename = perform_classification(df, target_column)
    elif task == 'R':
        perform_regression(df, target_column)  # Call regression_setup() before regression_compare_models()
        final_model, model_file_path, scoring_grid_filename, plot_filename = perform_regression(df, target_column)

    return final_model, model_file_path, scoring_grid_filename, plot_filename
