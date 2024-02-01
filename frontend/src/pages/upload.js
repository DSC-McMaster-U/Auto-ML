import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
        Paper, Button, ListItemText, ListItemButton, Box, Container
      } from "@mui/material"


const FileUploadComponent = ({ onUpload }) => {
  // Implement file upload logic and button (should be in existing)
};

const DataSetListComponent = ({ onSelectDataSet }) => {
  const [dataSets, setDataSets] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  useEffect(() => {
    // Fetch datasets from /api/datasets and update state
    const fetchData = async () => {
        try {
          const res = await fetch("/api/datasets");
          const data = await res.json();
          setDataSets(data.names);
        } catch {
          console.error("API Endpoint Not Working");
        }
      };
      fetchData();
  }, []);

  const handleSelectDataSet = (dataSet) => {
    setSelectedDataSet(dataSet);
    onSelectDataSet(dataSet); // This will pass the selected dataset to the parent component
  };

  return ( //render the list of selectable datasets
  <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
    <Box>
        {dataSets.map((dataSet, idx) => (
            <ListItemButton 
                key={idx} 
                selected={dataSet === selectedDataSet} 
                onClick={() => handleSelectDataSet(dataSet)}
            >
                <ListItemText primary={dataSet} />
            </ListItemButton>
        ))}
    </Box>
  </Paper>
  );
};

const DataSetDisplayComponent = ({ selectedDataSet }) => {
  const [data, setData] = useState([{}]);
  const [csvString, setCsvString] = useState("");

  useEffect(() => {
    // Simulate fetching data
    console.log("FETCHING DATA FOR", selectedDataSet)
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data?fileName=${encodeURIComponent(selectedDataSet)}`)
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        const jsonObject = data.json;

        setCsvString(data.data)
        setData(jsonObject);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
      }
    };
    fetchData();
}, [selectedDataSet]);

  const handleDownload = () => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDataSet}`;
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link); // Append to the document
    link.click(); // Programmatically click the link to trigger the download
    URL.revokeObjectURL(url); // Free up memory by releasing the object URL
    link.remove(); // Remove the link from the document
  }

  const headers = data[0] ? Object.keys(data[0]) : [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
       
        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
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
        <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
        </Button>
    </div>
  );
};

const MainComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  const handleUpload = (file) => {
    // Upload logic
  };

  const handleSelectDataSet = (dataSet) => {
    setSelectedDataSet(dataSet);
  };

  return (
    <div>
      <h1>Upload / Download Your Datasets Here!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, textAlign: 'center', margin: '10px' }}>
                {/* Container for Upload Button and DataSetListComponent */}
                <DataSetListComponent onSelectDataSet={handleSelectDataSet} />
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
                </div>
            </div>

            {selectedDataSet && (
                <div style={{ flex: 2, margin: '10px' }}>
                    {/* DataSetDisplayComponent with margin */}
                    <DataSetDisplayComponent selectedDataSet={selectedDataSet} />
                </div>
            )}
      </div>
    </div>
  );
};

export default MainComponent;