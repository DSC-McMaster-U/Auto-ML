import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ListItemText, ListItemButton, Box, Container, Typography, Alert } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import theme from '@/themes/theme';
import { YAxis } from 'recharts';

// Component to display the selected dataset
const BigQuery = () => {
  const [data, setData] = useState([{}]);
  const redux_dataset = useSelector((state) => state.dataset.value);
  const [csvString, setCsvString] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Simulate fetching data
  useEffect(() => {
    console.log('FETCHING DATA FOR', redux_dataset);
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/data?fileName=${encodeURIComponent(redux_dataset)}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        const jsonObject = data.json;

        setCsvString(data.data);
        setData(jsonObject);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
      }
      setLoading(false);
    };
    fetchData();
  }, [redux_dataset]);

  const [query, setQuery] = useState('-- use `table` for table name, eg:\nSELECT * FROM table LIMIT 2');

  const [isQueryLoading, setQueryLoading] = useState(false);
  const [error, setError] = useState(null);

  // calls the `/api/bq` endpoint with the `fileName` and `query` parameters
  const runQuery = async (query) => {
    setQueryLoading(true); // for the loading spinner
    setError(null); // clear any previous errors

    // List of potentially harmful operations
    const harmfulOps = ['DROP', 'DELETE', 'INSERT', 'UPDATE'];

    // Check if the query contains any harmful operations
    if (harmfulOps.some((op) => query.toUpperCase().includes(op))) {
      setError('Harmful operations detected');
      setQueryLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/bq?fileName=${encodeURIComponent(redux_dataset)}&query=${query}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const response = await res.json();

      // if response contains error key:
      if (response.error) {
        setError('invalid query');
        return;
      }
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('something went wrong, make sure your query is valid'); // inform the user of the error
    } finally {
      setQueryLoading(false); // remove the loading spinner
    }
  };

  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

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
        Run Queries on your Dataset:
      </Typography>

      <p style={{ fontFamily: 'Public Sans' }}>
        selected dataset: <code style={{ backgroundColor: '#f8f8f8', borderRadius: '5px', padding: '4px' }}>{redux_dataset}</code>
      </p>

      {isLoading ? (
        <CircularProgress size={24} color='inherit' style={{ margin: '16px' }} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '2%', width: '100%' }}>

          <TableContainer component={Paper} style={{ flex: 60, marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, 10).map((item, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(item).map((value, colIndex) => (
                      <TableCell key={colIndex}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ flex: 40 }}>
            <div style={{ border: '1px solid black', borderRadius: '8px', width: '100%', padding: '1%' }}>
              <Editor height='20vh' theme='vs' defaultLanguage='sql'
                options={{
                  fontSize: 15,
                  minimap: { enabled: false, scale: 1 },
                }}
                value={query}
                onChange={(value) => setQuery(value)}
              />
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <Button variant='contained' onClick={() => runQuery(query)} style={{ margin: '10px 5px' }}>
              {isQueryLoading ? <CircularProgress size={24} color='inherit' /> : <PlayCircleOutline style={{ marginRight: '5px' }} />}
              {isQueryLoading ? '' : 'Run'}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default BigQuery;
