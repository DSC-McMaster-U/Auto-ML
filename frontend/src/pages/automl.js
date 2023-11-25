// Automl.js
import React, { useState } from 'react';
import { Checkbox, Radio, FormControlLabel, RadioGroup, Button, IconButton } from '@mui/material';
import { CheckCircle, PlayArrow } from '@mui/icons-material';
import LineChartRecharts from './linechartrecharts';

const Automl = () => {
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
    } if (checkbox === 'checkbox2') {
      setCheckbox2(!checkbox2);
    } if (checkbox === 'checkbox3') {
    setCheckbox2(!checkbox2);
  }
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
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
                icon={<CheckCircle style={{ color: 'green', fontSize: 24 }} />}
                checkedIcon={<CheckCircle style={{ color: 'green', fontSize: 24 }} />}
                checked={checkbox1}
                onChange={() => 
                    handleCheckboxChange('checkbox1')}
              />
            }
            label="Classification"
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
                icon={<CheckCircle style={{ color: 'blue', fontSize: 24 }} />}
                checkedIcon={<CheckCircle style={{ color: 'blue', fontSize: 24 }} />}
                checked={checkbox2}
                onChange={() => handleCheckboxChange('checkbox2')}
              />
            }
            label="Regression"
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
                icon={<CheckCircle style={{ color: 'red', fontSize: 24 }} />}
                checkedIcon={<CheckCircle style={{ color: 'red', fontSize: 24 }} />}
                checked={checkbox2}
                onChange={() => handleCheckboxChange('checkbox3')}
              />
            }
            label="Loading"
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
  
  <IconButton color="primary">
    <PlayArrow style={{ fontSize: 24, color: 'blue' }} />
  </IconButton> Start AutoML
</div>

</div>

{/* Right Column */}
<div style={{ width: '50%', backgroundColor: '#e0e0e0', padding: '20px' }}>
<LineChartRecharts />
</div>
</div>
);
};

export default Automl;
