/* eslint-disable react/jsx-props-no-spreading */
import { Container } from '@mui/material';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import HeadMeta from '@/components/HeadMeta';
import { fetcher } from '@/config/api';
import { SWRConfig } from 'swr';

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      fetcher: (url: string) => fetcher(url),
    }}
  >
    <HeadMeta />
    <Container maxWidth={false} sx={{ bgcolor: '#edecec' }} className="py-5">
      <Layout />
      <Component {...pageProps} />
    </Container>
  </SWRConfig>
);

export default App;
