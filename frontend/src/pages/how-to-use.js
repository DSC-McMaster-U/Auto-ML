// import React, { useState, useEffect } from 'react';
import '@fontsource/public-sans';
import { Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import Layout from '../components/Layout'


const HowToUseYourModel = () => {
  return (
    <Layout showStepper={false}>
    <Container
      maxWidth='xl'
      sx={{
        fontFamily: 'Public Sans',
        textAlign: 'center',
        marginY: 4,
        height: '75vh',
      }}
    >
      <Typography
        variant='h2'
        sx={{
          mt: 5,
          fontFamily: 'Public Sans',
          fontWeight: 700,
          letterSpacing: '0.05rem',
          color: '#4285f4',
        }}
      >
        How To Use Your Model
      </Typography>
        
      <Typography
        variant='h6'
        sx={{
          mt: 5,
          fontFamily: 'Public Sans',
          fontWeight: 100,
          letterSpacing: '.05rem',
        }}
      >
        Your model is saved as a serialized object in a pickle file. The model can be imported into any python library that supports deserializing models in pickle file, such as Pycaret, SKLearn, and more.
        The following is an example of how one can you Pycaret to load the model and start making predictions on a testing dataset. 
      </Typography>
          
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 20px',
        height: '100%',
      }}
      >
      <iframe
          src='/automate_usage_example.html'
          title='Tutorial'
          width='100%'
          height='100%'
          style={{ border: '1px solid black' }}
        />
      </Box>
    </Container>
    </Layout>
    
  );
}

export default HowToUseYourModel;
