from operator import index
import streamlit as st
import pandas_profiling
import pandas as pd
from streamlit_pandas_profiling import st_profile_report

st.title("Exploratory Data Analysis")
    profile_df = df.profile_report()
    st_profile_report(profile_df)
