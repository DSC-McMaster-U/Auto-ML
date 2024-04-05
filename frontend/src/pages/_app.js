import Layout from '@/components/Layout';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Work_Sans } from 'next/font/google'
import '@/sass/style.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '@/store/store';

// If loading a variable font, you don't need to specify the font weight
const work_sans = Work_Sans({ subsets: ['latin'] })

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: work_sans.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Set the textTransform to 'none'
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
        <main className={work_sans.className}>
          <CssBaseline />
          <Component {...pageProps} />
        </main>
      </Provider>
      </ThemeProvider>
    </>
  );
}
