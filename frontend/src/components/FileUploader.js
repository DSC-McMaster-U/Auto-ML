import React, { useState } from "react";

const SingleFileUploader = ({setUploads, uploads}) => {
  
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
        console.log("Uploading file...");
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const result = await fetch("http://127.0.0.1:8000/api/dataset", {
            method: "POST",
            body: formData,
          });
    
          const data = await result.json();
          setUploads([...uploads, ...data])

        } catch (error) {
          console.error(error);
        }
    
  };}

  return (
    <div >
      <div style={{left:40}} >
        {/* <label htmlFor="file" className="sr-only">
          Choose a fil
        </label> */}
        <input style={{left:50}}id="file" type="file" onChange={handleFileChange} />
      </div>

      {file && <button onClick={handleUpload}>Upload a file</button>}
    </div>
  );
};

export default SingleFileUploader;