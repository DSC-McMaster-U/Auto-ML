import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import '@fontsource/public-sans';
import Image from 'next/image';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import UploadIcon from '@mui/icons-material/Upload';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import { setActiveStep } from '../store/activeStepSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
`;

const Element = styled.div`
  padding: 10px;
  text-align: center;
`;

const Picture = styled.div`
  padding: 10px;
  background-color: #fff;

  text-align: center;
  left: 10;
`;

export default function Home() {
  const [message, setMessage] = useState('Loading...');
  const router = useRouter();
  const dispatch = useDispatch();
  

  // test to see if the python API is working
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/python');
        const data = await res.json();
        setMessage(data.message);
      } catch {
        console.error('API Endpoint Not Working');
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <BoxContainer>
        <Element>
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
            Welcome to
          </Typography>

          <Typography
            variant='h1'
            sx={{
              fontFamily: 'Public Sans',
              fontWeight: 700,
              letterSpacing: '0.05rem',
              color: '#34A853',
            }}
          >
            AutoMate!
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
            An intuitive platform to explore your data and generate predictive machine learning models with ease.
          </Typography>

          <Button
            variant='contained'
            sx={{ mt: 2}}
            onClick={() => {
              dispatch(setActiveStep(0));
              router.push(`/upload`);
            }}
          >
            Start <InsightsIcon sx={{ ml:1 }}/>
          </Button>
        </Element>
        
        <Picture>
          <Image
            width={1000}
            height={1000}
            alt='AutoMate Logo'
            src='/AutoMate_logo.png'
          />
        </Picture>
      </BoxContainer>
    </Container>
  );
}
