import { Container } from "@mui/material";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import Head from "next/head";
import HeadMeta from "@/components/HeadMeta";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadMeta />
      <Container maxWidth={false} sx={{ bgcolor: "#edecec" }} className="py-5">
        <Layout />
        <Component {...pageProps} />
      </Container>
    </>
  );
}
