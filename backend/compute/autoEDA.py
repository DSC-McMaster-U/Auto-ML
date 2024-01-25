import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


def generate_eda_plots(df):
    # Create a correlation matrix
    corr_matrix = df.corr()

    # Create variable distributions
    variable_distributions = sns.pairplot(df)

    return corr_matrix, variable_distributions


def analyze_csv_and_plot(file_path):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(file_path)

    # Generate EDA plots
    corr_matrix, variable_distributions = generate_eda_plots(df)

    # Display the plots (or save them to files if needed)
    plt.show()


def generate_corr_matrix(file_path):
    df = pd.read_csv(file_path)

    corr_matrix = df.corr()

    # Assuming corr_matrix is a pandas DataFrame
    corr_matrix_dict = corr_matrix.to_dict()

    # Convert the dictionary to a JSON string
    corr_matrix_json = json.dumps(corr_matrix_dict)

    return corr_matrix_json


# # Example: Provide the path to your CSV file
# csv_file_path = r"C:/Users/Rawan Alamily/Downloads/GDSC/Auto-ML/machine-learning/fish_data.csv"

# analyze_csv_and_plot(csv_file_path)
