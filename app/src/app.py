import streamlit as st

with st.sidebar:
    st.image("../../imgs/McMaster_logo.png")
    st.title("SpawnML")
    choice = st.radio("Navigation", ["Upload", "Profiling", "ML", "Download"])
    st.info(
        "SpawnML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."
    )
    st.image("../../imgs/GDSC_logo.png")


if choice == "Upload":
    pass

if choice == "Profiling":
    pass

if choice == "Upload":
    pass

if choice == "Download":
    pass
