import HeadMeta from "@/components/HeadMeta";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <HeadMeta />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
