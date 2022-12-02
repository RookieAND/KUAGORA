import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "jotai";
import { QueryClientProvider, QueryClient } from "react-query";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/constants/styles/globalStyle";
import { theme } from "@/constants/styles/theme";
import "@/assets/fonts/font.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
