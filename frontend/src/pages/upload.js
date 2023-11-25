import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import "@fontsource/public-sans";

function Upload() {
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const rows = data.split('\n');
        const headers = rows[0].split(',');

        const parsedData = rows.slice(1).map((row) => {
          const values = row.split(',');

          if (headers.length !== values.length) {
            console.error('Mismatched header and value count:', headers, values);
            return {}; // or handle the mismatch in a way that makes sense for your application
          }

          return headers.reduce((obj, header, index) => {
            const trimmedHeader = header.trim();
            const trimmedValue = values[index].trim();
            obj[trimmedHeader] = trimmedValue;
            return obj;
          }, {});

        });

        setUploadedData(parsedData);
      };

      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ textAlign: "center", marginY: 4 }}>
      <Typography
        variant="h2"
        sx={{
          marginBottom: 2,
          fontFamily: "Public Sans",
          fontSize: "40px",
        }}
      >
        Upload Your Datasets Here!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 350,
            backgroundColor: "#EA4335",
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            borderRadius: 5,
            color: "black", // Change the text color to black
            padding: "20px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Public Sans",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: 2,
              color: "white", // Keep the title text color as white
            }}
          >
            Your Datasets
          </Typography>

          <Box
            sx={{
              width: "96%",
              height: 200,
              backgroundColor: "white",
              margin: "16px",
              borderRadius: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {uploadedData && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  margin: 0,
                  textAlign: "left",
                  color: "black", // Change the text color to black
                }}
              >
                {uploadedData.map((row, rowIndex) => {
                  return Object.values(row)
                    .map((value) => `${value},`)
                    .join('')
                    .slice(0, -1) + '\n';
                })}
              </pre>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: 200,
              backgroundColor: "#4285f4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Public Sans",
                fontSize: "22px",
                marginBottom: 2,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Click to Upload Files
            </Typography>
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <CloudUploadIcon sx={{ fontSize: 60, color: "white" }} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </Box>

          <Box
            sx={{
              width: "50%",
              height: 200,
              backgroundColor: "#34A853",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              borderRadius: 5,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FolderIcon
                sx={{ fontSize: 35, color: "white", marginRight: 2, marginLeft: 2, marginTop: 1 }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Public Sans",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                  marginTop: 1,
                }}
              >
                Select Example Datasets
              </Typography>
            </div>

            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "white",
                margin: "5px 0",
              }}
            ></div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Upload;