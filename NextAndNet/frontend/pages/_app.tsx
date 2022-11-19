import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, AppShell } from '@mantine/core';
import { SessionProvider } from "next-auth/react"
import { CustomHeader } from '../components/CustomHeader';
import { CustomFooter } from '../components/CustomFooter';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const { session, pageProps: actualProps } = pageProps;

  const title = actualProps?.title ?? "Hello!";

  const header = (<CustomHeader links={[
    {
      label: "Home",
      link: "/"
    },
    {
      label: "About",
      link: "/about"
    }
  ]} />);

  const footer = (<CustomFooter links={[]} />);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>  

      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'dark',
          }}
        >
          <AppShell header={header}
                    footer={footer} >
            <Component {...actualProps} />
          </AppShell>
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