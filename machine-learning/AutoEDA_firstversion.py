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

# Example: Provide the path to your CSV file
csv_file_path = r"C:\Users\izeyn\Downloads\datanew.csv"
analyze_csv_and_plot(csv_file_path)
