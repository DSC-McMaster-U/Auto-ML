import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Alert,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Container,
  Typography
} from '@mui/material';
import { PlayArrow, CloudDownload } from '@mui/icons-material';

const Automl = () => {
  const [modelGenerated, setModelGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const redux_dataset = useSelector((state) => state.dataset.value);

  const handleTaskSelection = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleTargetColumnChange = (event) => {
    setTargetColumn(event.target.value);
  };

  const handleStartAutoML = () => {
    if (targetColumn.trim() !== '' && selectedTask !== '') {
      setLoading(true);
      const fileName = redux_dataset.replace(/\.csv$/, '');
      fetch(
        `/api/generateModel?fileName=${encodeURIComponent(
          fileName
        )}&column=${encodeURIComponent(targetColumn)}&task=${encodeURIComponent(
          selectedTask
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error response');
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setModelGenerated(true);
          console.log('Response from backend:', data);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  const downloadModel = () => {
    fetch('/api/downloadModel')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error response');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const filename = redux_dataset.replace(/\.csv$/, '.pkl');
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error('Error:', error));
  };

  if (!redux_dataset) {
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <Alert severity='error' sx={{ marginY: 2 }}>
          No dataset selected, please go back to upload page.
        </Alert>
      </div>
    );
  }

  return (
    <Container
      maxWidth='xl'
      sx={{ fontFamily: 'Public Sans', textAlign: 'center', marginY: 4 }}
    >
      <Typography variant='h4' sx={{ marginBottom: 2, fontFamily: 'Public Sans' }}>
        AutoML
      </Typography>

      <p style={{ fontFamily: 'Public Sans' }}>
        selected dataset: <code style={{ backgroundColor: '#f8f8f8', borderRadius: '5px', padding: '4px' }}>{redux_dataset}</code>
      </p>
      <div style={{ width: '100%', padding: '20px' }}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Select Task</FormLabel>
          <RadioGroup
            aria-label='task'
            name='task'
            value={selectedTask}
            onChange={handleTaskSelection}
          >
            <FormControlLabel
              value='C'
              control={<Radio />}
              label='Classification'
            />
            <FormControlLabel
              value='R'
              control={<Radio />}
              label='Regression'
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id='target-column'
          label='Target Column'
          variant='outlined'
          fullWidth
          value={targetColumn}
          onChange={handleTargetColumnChange}
          disabled={!selectedTask}
          style={{ marginTop: '20px', marginRight: '10px' }}
        />
        <Button
          variant='contained'
          color='primary'
          disabled={!targetColumn || loading} // Disable button when loading
          onClick={handleStartAutoML}
          style={{ marginTop: '40px' }}
        >
          {loading ? <CircularProgress size={24} /> : <PlayArrow />}
          Start AutoML
        </Button>
        {modelGenerated && (
          <Button
            variant='contained'
            color='primary'
            onClick={downloadModel}
            style={{ marginTop: '40px', marginLeft: '10px' }}
          >
            <CloudDownload />
            Download Model
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Automl;
