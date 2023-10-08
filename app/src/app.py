import streamlit as st
import pandas as pd
from ydata_profiling import ProfileReport
from streamlit_pandas_profiling import st_profile_report
import os
from sklearn.datasets import load_wine


with st.sidebar:
    st.image("https://i.pinimg.com/originals/44/59/0f/44590fde1787fe8fe6b74148e9919fa2.png")
    st.title("SpawnML")
    choice = st.radio("Navigation", ["Upload", "Profiling", "ML", "Download"])
    st.info(
        "SpawnML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."
    )
    st.image("https://th.bing.com/th/id/OIP.EpZJGQh5zAO-XtEcTKSWDwHaEK?w=254&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")


if choice == "Upload":
    st.title("Upload Data Here!")
    file = st.file_uploader("Upload Your Dataset Here")
    if file :
        df = pd.read_csv(file)
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
        st.title("Exploratory Data Analysis")
        profile_df = ProfileReport(df)
        st_profile_report(profile_df)



if choice == "Download":
    pass


