import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Alert, Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Profiling = () => {
  const redux_dataset = useSelector((state) => state.dataset.value);
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Define the async function to fetch EDA data
    const fileName = redux_dataset.replace(/\.csv$/, ''); //remove .csv suffix for endpoint
    const fetchEda = async () => {
      try {
        // Encode fileName to ensure the URL is correctly formed
        const response = await fetch(
          `/api/eda-profile?fileName=${encodeURIComponent(fileName)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);
      } catch (error) {
        console.error('Fetching EDA data failed:', error);
      }
    };

    fetchEda(); // Execute the fetch operation

    return () => {
      URL.revokeObjectURL(iframeSrc);
    };
  }, [redux_dataset]);

  return (
    <Container
      maxWidth='xl'
      sx={{
        fontFamily: 'Public Sans',
        textAlign: 'center',
        marginY: 4,
        height: '75vh',
      }}
    >
      {!redux_dataset && (
        <Alert severity='error' sx={{ marginY: 2 }}>
          No dataset selected, please go to upload page.
        </Alert>
      )}
      <Typography
        variant='h4'
        style={{ fontFamily: 'Public Sans' }}
        gutterBottom
      >
        Data Profiling
      </Typography>

      <p style={{ fontFamily: 'Public Sans' }}>
        Current dataset:{' '}
        <code
          style={{
            backgroundColor: '#f8f8f8',
            borderRadius: '5px',
            padding: '4px',
          }}
        >
          {redux_dataset}
        </code>
      </p>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 20px',
          height: '100%',
        }}
      >
        {/* Display DataGrid or other profiling results here
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} />
        </div> */}
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title='EDA Profile'
            width='100%'
            height='100%'
            style={{ border: '1px solid black' }}
          />
        ) : (
          <div>
            <div>
              <Typography variant='p' style={{ fontFamily: 'Public Sans' }}>
                This could take a moment
              </Typography>
            </div>
            <CircularProgress
              size={24}
              color='inherit'
              style={{ margin: '16px' }}
            />
          </div>
        )}
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
