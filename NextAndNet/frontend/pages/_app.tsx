import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

// https://nextjs.org/docs/advanced-features/custom-app
// https://nextjs.org/docs/basic-features/typescript#custom-app
function MyApp({ Component, pageProps }: AppProps) {
  
  const {session, pageProps:actualProps} = pageProps;

  return (
    <SessionProvider session={session}>
      <Component {...actualProps} />
    </SessionProvider>
  )
}

export default MyApp;