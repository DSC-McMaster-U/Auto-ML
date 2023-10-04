import streamlit as st
import pandas as pd

with st.sidebar:
    st.image("../../imgs/McMaster_logo.png")
    st.title("SpawnML")
    choice = st.radio("Navigation", ["Upload", "Profiling", "ML", "Download"])
    st.info(
        "SpawnML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."
    )
    st.image("../../imgs/GDSC_logo.png")


if choice == "Upload":
    st.title("Upload Your Data for Modeling!")
    file = st.file_uploader("Upload Your Dataset Here")
    if file :
        df = pd.read_csv(file)
        st.dataframe(df)

if choice == "Profiling":
    pass

if choice == "Upload":
    pass

if choice == "Download":
    pass
