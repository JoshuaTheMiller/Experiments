import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { CustomHeader } from './CustomHeader'
import { CustomFooter } from './CustomFooter'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <CustomHeader links={[
      {
        label: "Home",
        link: "/"
      }
    ]} />    
    {children}    
    <CustomFooter links={[]} />
  </div>
)

export default Layout
