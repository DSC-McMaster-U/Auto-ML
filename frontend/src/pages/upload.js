import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
        Paper, Button, ListItemText, ListItemButton, Box, Container
      } from "@mui/material"


const FileUploadComponent = ({ onUpload }) => {
  // Implement file upload logic and button (should be in existing)
};

const DataSetListComponent = ({ onSelectDataSet }) => {
  const [dataSets, setDataSets] = useState(['alpha.csv', 'beta.csv', 'charlie.csv', 'delta.csv']);
  const [selectedDataSet, setSelectedDataSet] = useState(null);

  useEffect(() => {
    // Fetch datasets from /api/datasets and update state
    // const fetchData = async () => {
    //     try {
    //       const res = await fetch("/api/dataset");
    //       const data = await res.json();
    //       setDataSets(data.names);
    //     } catch {
    //       console.error("API Endpoint Not Working");
    //     }
    //   };
    //   fetchData();
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

//perhaps have small viewer window that shows the header of the data list? on a window on the right?
//out of scope tbh, this is an march extra
const DataSetDisplayComponent = ({ selectedDataSet }) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    // Simulate fetching data
    console.log("FETCHING DATA FOR", selectedDataSet)
    const fetchData = async () => {
        // Simulated JSON data (replace this with actual fetch call), might need to include logic to slice this to 10.
        const jsonData = [
          { "name": "Alice Johnson", "address": "123 Apple St, New York, NY", "email": "alice.johnson@email.com", "phone": "123-456-7890" },
          { "name": "Bob Smith", "address": "456 Orange Ave, Los Angeles, CA", "email": "bob.smith@email.com", "phone": "234-567-8901" },
          { "name": "Carol White", "address": "789 Banana Blvd, Chicago, IL", "email": "carol.white@email.com", "phone": "345-678-9012" },
          { "name": "David Brown", "address": "101 Pine Lane, Houston, TX", "email": "david.brown@email.com", "phone": "456-789-0123" },
          { "name": "Eve Davis", "address": "202 Maple Drive, Phoenix, AZ", "email": "eve.davis@email.com", "phone": "567-890-1234" },
          { "name": "Frank Moore", "address": "303 Cedar Rd, Boston, MA", "email": "frank.moore@email.com", "phone": "678-901-2345" },
          { "name": "Grace Lee", "address": "404 Oak St, San Francisco, CA", "email": "grace.lee@email.com", "phone": "789-012-3456" },
          { "name": "Henry Wilson", "address": "505 Birch Ave, Seattle, WA", "email": "henry.wilson@email.com", "phone": "890-123-4567" },
          { "name": "Isabel Young", "address": "606 Palm Way, Miami, FL", "email": "isabel.young@email.com", "phone": "901-234-5678" },
          { "name": "Jack Turner", "address": "707 Pineview Dr, Austin, TX", "email": "jack.turner@email.com", "phone": "012-345-6789" },
          { "name": "Kathy Hernandez", "address": "808 Maple Ln, Denver, CO", "email": "kathy.hernandez@email.com", "phone": "123-456-7890" },
          { "name": "Luis Gonzalez", "address": "909 Walnut St, Atlanta, GA", "email": "luis.gonzalez@email.com", "phone": "234-567-8901" },
          { "name": "Megan Clark", "address": "1010 Spruce Rd, Orlando, FL", "email": "megan.clark@email.com", "phone": "345-678-9012" },
          { "name": "Nathan Rivera", "address": "1111 Elm St, Las Vegas, NV", "email": "nathan.rivera@email.com", "phone": "456-789-0123" },
          { "name": "Olivia Martinez", "address": "1212 Cedar Ave, Portland, OR", "email": "olivia.martinez@email.com", "phone": "567-890-1234" }
      ];
        setData(jsonData);
    };

    fetchData();
}, [selectedDataSet]);

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
        <Button variant="contained" color="primary">
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