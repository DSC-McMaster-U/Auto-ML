import json
import uuid
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

    corr_matrix = df.corr().to_dict()

    return corr_matrix


def generate_eda(file_path):
    df = pd.read_csv(file_path)

    # Create a correlation matrix
    corr_matrix = df.corr().to_dict()

    # Create variable distributions (pairplot) and save it as a PNG
    plt.figure(figsize=(10, 10))
    variable_distributions = sns.pairplot(df)

    unique_filename = f"variable_distributions_{uuid.uuid4()}.png"
    variable_distributions.savefig(f"tempImages/{unique_filename}")
    plt.close()

    return corr_matrix, unique_filename


# # Example: Provide the path to your CSV file
# csv_file_path = r"C:/Users/Rawan Alamily/Downloads/GDSC/Auto-ML/machine-learning/fish_data.csv"

# analyze_csv_and_plot(csv_file_path)

# generate_eda(r"/Users/abedm/Documents/repos/Auto-ML/backend/compute/data.csv")
