import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
import '@fontsource/public-sans';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import {createRoot} from 'react-dom/client'
import ReactMarkdown from 'react-markdown'

const AboutMD = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);
  return (
    <div className='post'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

const Picture = styled.div`
  padding: 10px;
  background-color: #fff;

  text-align: center;
  left: 10;
`;


const AboutUs = () => {
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
        <Picture>
          <Image
            width={200}
            height={200}
            alt='AutoMate Logo'
            src='/AutoMate_logo.png'
          />
        </Picture>
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
          About the Development Team
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
        </Typography>
        {/* ReactDOM.render(<Markdown source={input} />, document.getElementById('container')) */}
        <div className='AboutUs'>
          <AboutMD />
        </div>
        
        <Picture>
          <Image
            width={1000}
            height={500}
            alt='AutoMate Architecture'
            src='/excal_architecture.png'
          />
        </Picture>
    </Container>
  );
}

export default AboutUs;
