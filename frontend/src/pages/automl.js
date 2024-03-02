// Automl.js
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { CheckCircle, PlayArrow, CloudDownload } from '@mui/icons-material';
import LineChartRecharts from './linechartrecharts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

//function generate_model() {
  
//}


//function download_model() {

//}

const Automl = () => {
  const [modelGenerated, setModelGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const [chartLoading, setChartLoading] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');

  const toggleChartLoading = () => {
    setChartLoading(!chartLoading);
  };

  const handleCheckboxChange = (checkbox) => {
    if (checkbox === 'checkbox1') {
      setCheckbox1(!checkbox1);
    }
    if (checkbox === 'checkbox2') {
      setCheckbox2(!checkbox2);
    }
    if (checkbox === 'checkbox3') {
      setCheckbox3(!checkbox3);
    }
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

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
    fetch("/api/generateModel")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error response');
      }
      return response.blob(); 
    })
    .then(blob => {
      return blob;
    })
    .catch(error =>{
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


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      }}
    >
      
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
      {/* Left Column */}
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
          disabled={!targetColumn}
          onClick={handleStartAutoML}
          style={{ marginTop: '20px' }}
        >
          <PlayArrow />
          Start AutoML
        </Button>
      </div>


    </div>

      {/* Right Column */}
      <div
        style={{ width: '50%', backgroundColor: '#e0e0e0', padding: '20px' }}
      >
        <LineChartRecharts />
        

      </div>
    </div>
  );
};

export default Automl;
