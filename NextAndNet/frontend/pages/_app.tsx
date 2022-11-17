import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '../services/msal';
import type { AppProps } from 'next/app'

// https://nextjs.org/docs/advanced-features/custom-app
// https://nextjs.org/docs/basic-features/typescript#custom-app
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp;