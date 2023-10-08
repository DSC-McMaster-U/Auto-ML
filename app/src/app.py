import streamlit as st
import pandas as pd
from sklearn.datasets import load_wine

# for the ML tab:
import plotly.express as px
import pycaret.regression as pycaret_rg
# from pycaret.regression import setup, compare_models, pull, save_model, load_model
import pycaret.classification as pycaret_cl

with st.sidebar:
    st.image("../../imgs/McMaster_logo.png")
    st.title("SpawnML")
    choice = st.radio("Navigation", ["Upload", "Profiling", "ML", "Download"])
    st.info(
        "SpawnML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."
    )
    st.image("../../imgs/GDSC_logo.png")

# initize session state
if "df" not in st.session_state:
    st.session_state["df"] = pd.DataFrame()

if choice == "Upload":
    st.title("Upload Data Here!")
    file = st.file_uploader("Upload Your Dataset Here")

    if file :
        df = pd.read_csv(file)
        st.session_state["df"] = df
        st.dataframe(df)

    st.subheader("OR")

    if st.button("Press to use Example Dataset") :
        wine = load_wine()
        X = pd.DataFrame(wine.data, columns=wine.feature_names)
        Y = pd.Series(wine.target, name='response')
        df = pd.concat([X, Y], axis=1)

        st.markdown("The Wine dataset is used as the example.")
        st.dataframe(df)

if choice == "Profiling":
    st.title("Profiling Data")

if choice == "ML":
    st.title("Start the model generation process!")
    st.write("select the column name you want to classify/regress")

    df = st.session_state["df"]
    df.info()

    if df is not None and not df.empty:  # Check if df is defined and not empty
        target_col = st.selectbox('Choose the Target Column', df.columns)
        # Remove rows with missing values in the "target" column
        df = df.dropna(subset=[target_col])

        if st.button('Run Regression Modelling'):
            pycaret_rg.setup(df, target=target_col)
            setup_df = pycaret_rg.pull()

            st.info("Experiment settings : ")
            setup_df = setup_df.astype(str)
            st.dataframe(setup_df)

            # Display a loading spinner
            with st.spinner("Loading..."):
                # Place your time-consuming code here
                best_model = pycaret_rg.compare_models()
                compare_df = pycaret_rg.pull()

            # Once the code completes, the spinner will disappear
            st.info("Results:")
            st.dataframe(compare_df)

            st.info("Best model : ")
            best_model

            pycaret_rg.save_model(best_model, 'best_model')

        elif st.button('Run Classification Modelling'):
            df[target_col] = df[target_col].astype(int)
            pycaret_cl.setup(df, target=target_col)
            setup_df = pycaret_cl.pull()

            st.info("Experiment settings : ")
            setup_df = setup_df.astype(str)
            st.dataframe(setup_df)

            # Display a loading spinner
            with st.spinner("Loading..."):
                # Place your time-consuming code here
                best_model = pycaret_rg.compare_models()
                compare_df = pycaret_rg.pull()

            # Once the code completes, the spinner will disappear
            st.info("Results:")
            st.dataframe(compare_df)

            st.info("Best model : ")
            best_model

            pycaret_cl.save_model(best_model, 'best_model')
    else:
        st.warning("Please upload or select a dataset in the 'Upload' tab.")

if choice == "Download":
    st.title("Download the Model")
    with open('best_model.pkl', 'rb') as f: 
        st.download_button('Download ⬇️', f, file_name="best_model.pkl")