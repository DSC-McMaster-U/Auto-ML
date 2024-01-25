import React, { useState, useEffect } from 'react';
import {ListItemText, ListItemButton, Box, Container} from "@mui/material"


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
    <Box>
        {dataSets.map((dataSet, idx) => (
        <ListItemButton 
          key={idx} 
          selected={dataSet === selectedDataSet} 
          onClick={() => handleSelectDataSet(dataSet)}
        >
                <ListItemText>
                    {dataSet}
                </ListItemText>   
            </ListItemButton>
        ))}
    </Box>
  );
};

//perhaps have small viewer window that shows the header of the data list? on a window on the right?
//out of scope tbh, this is an march extra
const DataSetDisplayComponent = ({ selectedDataSet }) => {
  const [data, setData] = useState({
    name: 'bob'

  });

  useEffect(() => {
    // Fetch data from /api/data
  }, [selectedDataSet]);

  return (
    // Display data
    <Box>

    </Box>
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
      {/* <FileUploadComponent onUpload={handleUpload} /> */}
      <DataSetListComponent onSelectDataSet={handleSelectDataSet} />
      {/* {selectedDataSet && <DataSetDisplayComponent selectedDataSet={selectedDataSet} />} */}
    </div>
  );
};

export default MainComponent;
