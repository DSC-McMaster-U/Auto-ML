# building the image for the first will take sometime
FROM python:3.8.10

# re-build if any file under the 'app' dir is modified including this Dockerfile 
WORKDIR /app
COPY . .

# install all deps
RUN pip install -r requirements.txt 

# Expose port 8501
EXPOSE 8501

# Set the Streamlit app as the entry point
# ENTRYPOINT [ "bash" ]
CMD ["bash", "-c", "streamlit run src/app.py"]


############# How to use ? ############

# 1. cd into the dir where the Dockerfile is located : cd app
# 2. Build the image using : docker build -t auto-ml .
# 3. Run container based on the built image : docker run -it -p 8501:8501 auto-ml