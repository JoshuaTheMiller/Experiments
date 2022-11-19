import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";

// https://nextjs.org/docs/advanced-features/custom-app
// https://nextjs.org/docs/basic-features/typescript#custom-app
function MyApp({ Component, pageProps }: AppProps) {

  const { session, pageProps: actualProps } = pageProps;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...actualProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp;