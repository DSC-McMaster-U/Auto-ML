import Layout from '@/components/Layout';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/theme';
import '@/sass/style.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      <Provider store={store}>
        {/* <Layout> */}
          <CssBaseline />
          <Component {...pageProps} />
        {/* </Layout> */}
      </Provider>
      {/* </ThemeProvider> */}
    </>
  );
}
