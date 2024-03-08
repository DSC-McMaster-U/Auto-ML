import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Paper, 
  Box,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { PlayArrow, CloudDownload } from '@mui/icons-material';
import LineChartRecharts from './linechartrecharts';

// Component to display the list of all datasets
const DataSetListComponent = ({ onSelectDataSet, uploadTrigger }) => {
  // hooks to store the datasets and the selected dataset
  const [dataSets, setDataSets] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState(null);

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
    setSelectedDataSet(dataSet);
    onSelectDataSet(dataSet); // This will pass the selected dataset to the parent component
  };

  return (
    //render the list of selectable datasets
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

const Automl = () => {
  const [modelGenerated, setModelGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const redux_dataset = useSelector((state) => state.dataset.value);

  const handleTaskSelection = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleTargetColumnChange = (event) => {
    setTargetColumn(event.target.value);
  };

  const handleStartAutoML = () => {
    if (targetColumn.trim() !== '') {
      setOpenDialog(true);
      generate_model();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const generate_model = () => {
    setLoading(true); // Show loading indicator
    fetch("/api/generateModel")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error response');
      }
      return response.blob(); 
    })
    .then(blob => {
      setLoading(false); // Hide loading indicator
      setModelGenerated(true); // Set model generated flag
      return blob;
    })
    .catch(error =>{
      setLoading(false); // Hide loading indicator in case of error
      console.error('Error:', error)
    })
  };

  const download_model= () => {
    fetch("/api/downloadModel")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error response');
      }
      return response.blob(); 
    })
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'model.pickle'); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      //done downloading
      return blob;
    })
    .catch(error => console.error('Error:', error));
  };

  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [uploadTrigger, setUploadTrigger] = useState(0);

  const handleSelectDataSet = (dataSet) => {
    setSelectedDataSet(dataSet);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      }}
    >
      {/* Left Column */}
      <div style={{ width: '50%', padding: '20px' }}>
        <Typography variant="h6">Datasets:</Typography>
        <DataSetListComponent
          onSelectDataSet={handleSelectDataSet}
          uploadTrigger={uploadTrigger}
        />
      </div>
      
      {/* Right Column */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
        <div style={{ width: '50%', padding: '20px' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Task</FormLabel>
            <RadioGroup aria-label="task" name="task" value={selectedTask} onChange={handleTaskSelection}>
              <FormControlLabel value="classification" control={<Radio />} label="Classification" />
              <FormControlLabel value="regression" control={<Radio />} label="Regression" />
            </RadioGroup>
          </FormControl>
          <TextField
            id="target-column"
            label="Target Column"
            variant="outlined"
            fullWidth
            value={targetColumn}
            onChange={handleTargetColumnChange}
            disabled={!selectedTask}
            style={{ marginTop: '20px' }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!targetColumn || loading} // Disable button when loading
            onClick={handleStartAutoML}
            style={{ marginTop: '20px' }}
          >
            {loading ? <CircularProgress size={24} /> : <PlayArrow />}
            Start AutoML
          </Button>
        </div>
      </div>
  
      {/* Right Column */}
      <div
        style={{ width: '50%', backgroundColor: '#e0e0e0', padding: '20px' }}
      >
        {modelGenerated && (
          <Button
            variant="contained"
            color="primary"
            onClick={download_model}
            style={{ marginTop: '20px' }}
          >
            <CloudDownload />
            Download Model
          </Button>
        )}
        {loading && <CircularProgress size={24} style={{ marginTop: '20px' }} />}
        <LineChartRecharts />
      </div>
    </div>
  );
  
};

export default Automl;