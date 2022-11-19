import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, AppShell } from '@mantine/core';
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const { session, pageProps: actualProps } = pageProps;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Layout>
            <AppShell>
              <Component {...actualProps} />
            </AppShell>
          </Layout>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

// import type { AppProps } from 'next/app'
// import Layout from "../components/Layout";

// // https://nextjs.org/docs/advanced-features/custom-app
// // https://nextjs.org/docs/basic-features/typescript#custom-app
// function MyApp({ Component, pageProps }: AppProps) {

//   const { session, pageProps: actualProps } = pageProps;

//   return (
//     <SessionProvider session={session}>
//       <Layout>
//         <Component {...actualProps} />
//       </Layout>
//     </SessionProvider>
//   )
// }

// export default MyApp;