/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Container } from '@mui/material';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import HeadMeta from '@/components/HeadMeta';
import { fetcher } from '@/config/api';
import { SWRConfig } from 'swr';

const App = ({ Component, pageProps }: AppProps) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    require('../mocks');
  }

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (url: string) => fetcher(url),
      }}
    >
      <HeadMeta />
      <Container maxWidth={false} sx={{ bgcolor: '#edecec' }}>
        <Box className="w-[65%] mx-auto my-0 py-10 min-w-[1200px]">
          <Layout />
          <Component {...pageProps} />
        </Box>
      </Container>
    </SWRConfig>
  );
};

export default App;
