import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { RepositoriesContextProvider } from "../contexts/RepositoriesContext";
import { queryClient } from '../services/query';

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RepositoriesContextProvider>
        <Component {...pageProps} />
      </RepositoriesContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
