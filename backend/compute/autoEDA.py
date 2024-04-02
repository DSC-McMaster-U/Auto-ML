import json
import uuid
import pandas as pd
import matplotlib.pyplot as plt
from ydata_profiling import ProfileReport

# main function to generate the EDA report
def profile(file_path):
    df = pd.read_csv(file_path)
    profile = ProfileReport(df, title="Profiling Report")
    unique_filename = f"your_report_{uuid.uuid4()}.html"
    profile.to_file(f"tempHTML/{unique_filename}")
    return unique_filename

# legacy - not called by backend 
def generate_eda_plots(df):
    # Create a correlation matrix
    corr_matrix = df.corr()

    return corr_matrix


def analyze_csv_and_plot(file_path):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(file_path)

    # Generate EDA plots
    corr_matrix = generate_eda_plots(df)

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

    return corr_matrix


def get_nulls(file_path):
    df = pd.read_csv(file_path)
    return df.isnull().sum(axis=1).sum()


def get_distributions(file_path):
    df = pd.read_csv(file_path)

    df.hist()
    plt.gcf().set_size_inches(15, 10)
    unique_filename = f"variable_distributions_{uuid.uuid4()}.png"
    plt.savefig(f"tempImages/{unique_filename}")
    plt.close()

    return unique_filename


def get_types(file_path):
    df = pd.read_csv(file_path)
    return df.dtypes
