import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataset } from '../store/datasetSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ListItemText,
  ListItemButton,
  Box,
  Container,
  Typography,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const DataSetListComponent = ({ uploadTrigger }) => {
  const [dataSets, setDataSets] = useState([]);

  const redux_dataset = useSelector((state) => state.dataset.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch datasets from /api/datasets and update state
    const fetchData = async () => {
      try {
        const res = await fetch('/api/datasets');
        const data = await res.json();
        setDataSets(data.names);
      } catch {
        console.error('API Endpoint Not Working');
      }
    };
    fetchData();
  }, [uploadTrigger]);

  const handleSelectDataSet = (dataSet) => {
    dispatch(setDataset(dataSet));
  };

  return (
    //render the list of selectable datasets
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
      <Box>
        {dataSets.map((dataSet, idx) => (
          <ListItemButton
            key={idx}
            selected={dataSet === redux_dataset}
            onClick={() => handleSelectDataSet(dataSet)}
          >
            <ListItemText primary={dataSet} />
          </ListItemButton>
        ))}
      </Box>
    </Paper>
  );
};

const DataSetDisplayComponent = () => {
  const [data, setData] = useState([{}]);
  const [csvString, setCsvString] = useState('');

  const redux_dataset = useSelector((state) => state.dataset.value);

  useEffect(() => {
    // Simulate fetching data
    console.log('Fetching data for', redux_dataset);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/data?fileName=${encodeURIComponent(redux_dataset)}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        const jsonObject = data.json;

        setCsvString(data.data);
        setData(jsonObject);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
      }
    };
    fetchData();
  }, [redux_dataset]);

  const handleDownload = () => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${redux_dataset}`;
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link); // Append to the document
    link.click(); // Programmatically click the link to trigger the download
    URL.revokeObjectURL(url); // Free up memory by releasing the object URL
    link.remove(); // Remove the link from the document
  };

  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <TableContainer
        component={Paper}
        className='scrollable-table-container'
        style={{ marginBottom: '20px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 10).map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(item).map((value, colIndex) => (
                  <TableCell key={colIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='contained'
        color='primary'
        onClick={handleDownload}
        startIcon={<CloudDownloadIcon />}
      >
        Download
      </Button>
    </div>
  );
};

const MainComponent = () => {
  const [uploadTrigger, setUploadTrigger] = useState(0);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name); // Adjust according to how you want to name files on the backend

    // Log FormData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      // Make an asynchronous PUT request to your backend
      const response = await fetch('/api/upload', {
        method: 'PUT',
        body: formData, // FormData will be correctly interpreted by your backend
      });

      // Assuming your backend responds with JSON
      const data = await response.json();

      // Handle response
      if (response.ok) {
        console.log('Upload successful:', data.message);
        setUploadTrigger((trigger) => trigger + 1);
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const triggerFileInput = () => {
    // Trigger the hidden file input click event
    document.getElementById('file-upload-input').click();
  };

  const redux_dataset = useSelector((state) => state.dataset.value);

  return (
    <Container maxWidth='xl' sx={{ textAlign: 'center', marginY: 4 }}>
      <Typography
        variant='h2'
        sx={{
          marginBottom: 2,
          fontFamily: 'Public Sans',
          fontSize: '40px',
        }}
      >
        Upload Your Datasets Here!
      </Typography>

      {redux_dataset && (
        <p style={{ fontFamily: 'Public Sans' }}>
          Current dataset: {redux_dataset}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1, textAlign: 'center', margin: '10px' }}>
          <DataSetListComponent uploadTrigger={uploadTrigger} />
          <div style={{ marginTop: '20px' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={triggerFileInput}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
            <input
              id='file-upload-input'
              type='file'
              accept='.csv'
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
          </div>
        </div>

        {redux_dataset && (
          <div style={{ flex: 2, margin: '10px' }}>
            <DataSetDisplayComponent />
          </div>
        )}
      </div>
    </Container>
  );
};

export default MainComponent;
