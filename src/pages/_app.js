import * as React from 'react';
import { store } from '../store'
import { Provider } from 'react-redux'
import LayoutWrapper from '../layouts';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* <CssBaseline /> */}
          <LayoutWrapper {...pageProps}>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}