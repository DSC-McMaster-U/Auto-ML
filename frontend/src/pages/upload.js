import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import Uploader from "@/components/FileUploader"
import "@fontsource/public-sans";

function Upload() {
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
            <Typography variant="h2" sx={{ fontSize: "22px", marginBottom: 2 }}> 
              Drag Files to Upload
            </Typography>
            <CloudUploadIcon sx={{ fontSize: 38, color: "black" }} />
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