import React, { ReactNode } from 'react'
import Head from 'next/head'
import { CustomHeader } from './CustomHeader'
import { CustomFooter } from './CustomFooter'
import { useSession } from 'next-auth/react'

type Props = {
  children?: ReactNode
  title?: string  
}

function Layout({ children, title = 'This is the default title' }: Props) {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>      
      {children}      
    </div>
  )
} 
export default Layout
