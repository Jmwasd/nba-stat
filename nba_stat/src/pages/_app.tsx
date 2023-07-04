import { Container } from "@mui/material";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth={false} sx={{ bgcolor: "#edecec" }} className="py-5">
      <Layout />
      <Component {...pageProps} />
    </Container>
  );
}
