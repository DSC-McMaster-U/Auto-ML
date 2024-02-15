// Automl.js
import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  IconButton,
  CircularProgress,
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

  const generate_model = () => {
    setLoading(true);
    setModelGenerated(false);
    fetch("/api/generateModel")
    .then(response => {
      if (!response.ok) {
        throw new Error('Error response');
      }
      //model is generated so set to true
      setModelGenerated(true);
      return response.blob(); 
    })
    .then(blob => {
      return blob;
    })
    .catch(error =>{
      console.error('Error:', error)
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const download_model= () => {
    setDownloading(true);
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
      setDownloading(false);
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
      {/* Left Column */}
      <div style={{ width: '50%', padding: '20px' }}>
        <div
          style={{
            marginBottom: '10px',
            background: '#ddd',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                style={{ borderRadius: '0' }} // Square Checkbox
                icon={
                  <CheckCircle style={{ color: '#34A853', fontSize: 24 }} />
                }
                checkedIcon={
                  <CheckCircle style={{ color: '#288140', fontSize: 24 }} />
                }
                checked={checkbox1}
                onChange={() => handleCheckboxChange('checkbox1')}
              />
            }
            label={
              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                Classification
              </Typography>
            }
          />
        </div>
        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            background: '#ddd',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                style={{ borderRadius: '0' }} // Square Checkbox
                icon={
                  <CheckCircle style={{ color: '#FBBC05', fontSize: 24 }} />
                }
                checkedIcon={
                  <CheckCircle style={{ color: '#e3aa04', fontSize: 24 }} />
                }
                checked={checkbox2}
                onChange={() => handleCheckboxChange('checkbox2')}
              />
            }
            label={
              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                Regression
              </Typography>
            }
          />
        </div>
        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            background: '#ddd',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                style={{ borderRadius: '0' }} // Square Checkbox
                icon={
                  <CheckCircle style={{ color: '#EA4335', fontSize: 24 }} />
                }
                checkedIcon={
                  <CheckCircle style={{ color: '#d62516', fontSize: 24 }} />
                }
                checked={checkbox3}
                onChange={() => handleCheckboxChange('checkbox3')}
              />
            }
            label={
              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                Loading
              </Typography>
            }
          />
        </div>

        <div
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            background: '#ddd',
            padding: '20px',
            borderRadius: '10px',
            fontFamily: 'Public Sans',
          }}
        >
          <IconButton color='primary' onClick={generate_model}>
            <PlayArrow style={{ fontSize: 24, color: '#4285F4'}}/>
          </IconButton>{' '}
          Start AutoML
        </div>
      </div>

      {/* Right Column */}
      <div
        style={{ width: '50%', backgroundColor: '#e0e0e0', padding: '20px' }}
      >
        <LineChartRecharts />
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
          )}
          {modelGenerated && (
            <div>
              {/* Button to download model only if model has been created*/}
              <Button
                variant="contained"
                disabled={downloading}
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={download_model}
              >
                {downloading ? (
                  <CircularProgress size={24} />
                ) : (
                  <CloudDownload />
                )}
                Download Model
              </Button>
            </div>
          )}

      </div>
    </div>
  );
};

export default Automl;
