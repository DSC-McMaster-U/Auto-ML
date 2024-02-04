import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder

def encode_string_variables(df):
    string_cols = df.select_dtypes(include=['object']).columns


    label_encoder = LabelEncoder()
    for col in string_cols:
        df[col] = label_encoder.fit_transform(df[col].astype(str))

    return df

def generate_eda_plots(df):
    df_encoded = encode_string_variables(df)


    corr_matrix = df_encoded.corr()


    variable_distributions = sns.pairplot(df_encoded)


    plt.figure(figsize=(12, 8))


    num_plots = min(3, len(df.columns))  
    for i, col in enumerate(df.columns[:num_plots]):
        plt.subplot(2, 2, i + 1)

        if df[col].dtype == 'O':
            sns.countplot(data=df_encoded, x=col)
            plt.title(f'Bar Plot for {col}')
        else:
            sns.histplot(data=df_encoded, x=col, kde=True)
            plt.title(f'Histogram for {col}')


    decrypted_variable_names = ['DecryptedVar1', 'DecryptedVar2', 'DecryptedVar3']
    plt.suptitle('Exploratory Data Analysis', y=1.02, fontsize=16)

    plt.tight_layout()
    plt.show()

    return corr_matrix, variable_distributions

def analyze_csv_and_plot(file_path):
    df = pd.read_csv(file_path)

    corr_matrix, variable_distributions = generate_eda_plots(df)

# Example
csv_file_path = r"C:\Users\...\...\datatrial.csv"
analyze_csv_and_plot(csv_file_path)
