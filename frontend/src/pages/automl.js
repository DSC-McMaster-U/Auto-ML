import React, { useState } from 'react';
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
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { PlayArrow, CloudDownload } from '@mui/icons-material';
import Layout from '../components/Layout'

const ScoringGrid = ({ scoringGrid }) => {
  //parsing the scoring grid csv into rows and columns so it can be displayed
  const rows = scoringGrid.trim().split('\n').map(row => row.split(','));

  return (
    <div style={{ margin: '10px', flex: '1 1 auto' }}>
      <h3>Scoring Grid:</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {rows.length > 0 && rows[0].map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const Automl = () => {
  const [modelGenerated, setModelGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [scoringGrid, setScoringGrid] = useState('');
  const [plotUrl, setPlotUrl] = useState('');
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
      fetch(`/api/generateModel?fileName=${encodeURIComponent(fileName)}&column=${encodeURIComponent(targetColumn)}&task=${encodeURIComponent(selectedTask)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error response');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          setModelGenerated(true);
          console.log("Response from backend:", data);
          setScoringGrid(data.scoring_grid);
          setPlotUrl(data.plot_model_url);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  const downloadModel = () => {
    fetch("/api/downloadModel")
      .then(response => {
        if (!response.ok) {
          throw new Error('Error response');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const filename = redux_dataset.replace(/\.csv$/, ".pkl");
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error('Error:', error));
  };

  if (!redux_dataset) {
    return (
        <Layout showStepper={true}>
      <div style={{ width: '100%', padding: '20px' }}>
        <Alert severity='error' sx={{ marginY: 2 }}>
          No dataset selected, please go back to upload page.
        </Alert>
      </div>
      </Layout>
    );
  }


  return (
    <Layout showStepper={true}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Selection and Buttons */}
      <div style={{ width: '100%', padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontFamily: "Public Sans" }}>Current dataset: {redux_dataset}</p>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Task</FormLabel>
          <RadioGroup aria-label="task" name="task" value={selectedTask} onChange={handleTaskSelection}>
            <FormControlLabel value="C" control={<Radio />} label="Classification" />
            <FormControlLabel value="R" control={<Radio />} label="Regression" />
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
          style={{ marginTop: '20px', width: '300px' }}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={!targetColumn || loading}
            onClick={handleStartAutoML}
            style={{ marginTop: '20px', marginRight: '10px', padding: '6px' }}
          >
            {loading ? <CircularProgress size={24} /> : <PlayArrow />}
            Start AutoML
          </Button>
          {modelGenerated && (
            <Button
              variant="contained"
              color="primary"
              onClick={downloadModel}
              style={{ marginTop: '20px', marginLeft: '10px', padding: '6px' }}
            >
              <CloudDownload style={{ marginRight: '6px' }} />
              Download Model
            </Button>

          )}
        </div>
      </div>

      {/* Scoring Grid and Plot */}
      {modelGenerated && (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: '40px', paddingRight: '35px' }}>
          {/* Scoring Grid */}
          {scoringGrid && <ScoringGrid scoringGrid={scoringGrid} />}

          {/* Plot */}
          {plotUrl && (
            <div style={{ margin: '20px', flex: '1 1 auto' }}>
              <h3>Plot:</h3>
              <img src={plotUrl} alt="Plot" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      )}

    </div>
    </Layout>
  );

};

export default Automl;