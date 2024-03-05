import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Alert, Button, Typography, Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  InfoOutlined as InfoOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  QueryStatsOutlined as QueryStatsOutlinedIcon,
  PriorityHigh as PriorityHighIcon,
  PreviewOutlined as PreviewOutlinedIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@mui/icons-material';
import CorrelationMatrix from '@/components/CorrelationMatrix';

const Profiling = () => {
  // Define your data and fetch or process it as needed
  const [data, setData] = useState([]);
  const [edaData, setEda] = useState({});
  const redux_dataset = useSelector((state) => state.dataset.value);

  const [isCMOpen, setCM] = useState(false); //visibility of correlation matrix
  const toggleCMPoppover = () => setCM(!isCMOpen);

  useEffect(() => {
    // Define the async function to fetch EDA data
    const fileName = redux_dataset.replace(/\.csv$/, ''); //remove .csv suffix for endpoint
    const fetchEda = async () => {
      try {
        // Encode fileName to ensure the URL is correctly formed
        const response = await fetch(`/api/eda?fileName=${encodeURIComponent(fileName)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("eda:", data)
        setEda(data); // Set the EDA data to state
      } catch (error) {
        console.error('Fetching EDA data failed:', error);
        // Handle the error or set some error state to show an error message
      }
    };

    fetchEda(); // Execute the fetch operation

  }, [redux_dataset]);

  // Define columns for the DataGrid
  const columns = [
    { field: 'property', headerName: 'Property', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1 },
  ];

  return (
    <Container
      maxWidth='xl'
      sx={{ fontFamily: 'Public Sans', textAlign: 'center', marginY: 4 }}
    >
      {!redux_dataset && (
        < Alert severity='error' sx={{ marginY: 2 }}>No dataset selected, please go to upload page.</Alert>
      )}
      <Typography
        variant='h4'
        style={{ fontFamily: 'Public Sans' }}
        gutterBottom
      >
        Data Profiling
      </Typography>

      <p style={{ fontFamily: "Public Sans" }} >
        Current dataset: {redux_dataset}
      </p>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 20px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' alignItems='center'>
              <InfoOutlinedIcon style={{ color: '#4285F4' }} fontSize='large' />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Overview
              </Typography>
            </Box>
            {/*Display basic information here*/}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' alignItems='center'>
              <DescriptionOutlinedIcon
                style={{ color: '#34A853' }}
                fontSize='large'
              />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Variables
              </Typography>
            </Box>
            {/*Display summary statistics here*/}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' alignItems='center'>
              <BarChartOutlinedIcon
                style={{ color: '#FBBC05' }}
                fontSize='large'
              />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Interactions
              </Typography>
            </Box>
            {/*Display data distribution here*/}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>

            <Button variant="text" display='flex' alignItems='center' onClick={toggleCMPoppover}>
              <QueryStatsOutlinedIcon style={{ color: '#4285F4' }} fontSize='large' />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Correlations
              </Typography>
              {isCMOpen && (<ArrowDropUpIcon style={{ marginLeft: 8 }} />)}
              {!isCMOpen && (<ArrowDropDownIcon style={{ marginLeft: 8 }} />)}
            </Button>
            {/*Display correlation matrix here*/}
            <CorrelationMatrix eda={edaData} isOpen={isCMOpen} onClose={toggleCMPoppover} />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' alignItems='center'>
              <PriorityHighIcon style={{ color: '#EA4335' }} fontSize='large' />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Missing Values
              </Typography>
            </Box>
            {/* Display correlation matrix here */}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' alignItems='center'>
              <PreviewOutlinedIcon
                style={{ color: '#34A853' }}
                fontSize='large'
              />
              <Typography variant='h6' style={{ marginLeft: 8 }}>
                Samples
              </Typography>
            </Box>
            {/* Display correlation matrix here */}
          </Grid>
        </Grid>

        {/* Display DataGrid or other profiling results here */}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} />
        </div>
      </Box>
    </Container>
  );
};

export default Profiling;

/*
BUTTONS WE NEED TO ADD, MOVED FROM INDEX PAGE:
          <Element style={{ marginTop: 10 }}>
            <Button
              style={{
                "background-color": "#34A853",
                border: "1px solid #333",
                width: 150,
                height: 55,
                fontFamily: "Public Sans",
                color: "white",
                marginRight: 10,
              }}
            >
              <BarChartIcon style={{ border: "black" }} /> Auto-EDA
            </Button>

            <Button
              style={{
                "background-color": "white",
                border: "1px solid #333",
                width: 150,
                height: 55,
                fontFamily: "Public Sans",
                color: "#EA4335",
              }}
            >
              <UploadIcon />
              Dataset
            </Button>
          </Element>
          */

/*

// Define a component for each grid item
const GridItem = ({ icon, color, title }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box display="flex" alignItems="center">
      {icon({ style: { color }, fontSize: 'large' })}
      <Typography variant="h6" style={{ marginLeft: 8 }}>
        {title}
      </Typography>
    </Box>
    {/* Display content related to the grid item here }
    </Grid>
    );
    
    const Profiling = () => {
      // Define your data state
      const [data, setData] = useState([]);
      const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded or not
    
      useEffect(() => {
        // Fetch or process your data here and set it in the state
        // Example: const fetchData = async () => { ... }
        // fetchData().then((result) => { setData(result); setDataLoaded(true); });
      }, []); // Add any dependencies for the useEffect if needed
    
      return (
        <Container maxWidth="xl" sx={{ fontFamily: 'Public Sans', textAlign: 'center', marginY: 4 }}>
          <Typography variant="h4" style={{ fontFamily: 'Public Sans' }} gutterBottom>
            Data Profiling
          </Typography>
    
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 20px',
            }}
          >
            {dataLoaded ? (
              // Display profiling components when data has been uploaded
              <Grid container spacing={3}>
                <GridItem icon={InfoOutlinedIcon} color="#4285F4" title="Overview" />
                <GridItem icon={DescriptionOutlinedIcon} color="#34A853" title="Variables" />
                <GridItem icon={BarChartOutlinedIcon} color="#FBBC05" title="Interactions" />
                <GridItem icon={QueryStatsOutlinedIcon} color="#4285F4" title="Correlations" />
                <GridItem icon={PriorityHighIcon} color="#EA4335" title="Missing Values" />
                <GridItem icon={PreviewOutlinedIcon} color="#34A853" title="Samples" />
              </Grid>
            ) : (
              // Display a warning message when data is not loaded
              <Typography variant="body1" color="error" style={{ margin: '16px' }}>
                Please upload or select a dataset under the 'Upload' tab.
              </Typography>
            )}
          </Box>
        </Container>
      );
    };
    
    export default Profiling;
*/
