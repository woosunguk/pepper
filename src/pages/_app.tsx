import * as React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/joy'

import '../styles/globals.css'

const theme = createTheme({
  components: {},
})

type NextPageWithLayout = NextPage & {
  layoutProps?: {
    Layout: React.FC
    nav?: any
  }
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layoutProps?.Layout || React.Fragment
  const layoutProps = Component.layoutProps?.Layout ? { layoutProps: Component.layoutProps } : {}

  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Layout {...layoutProps}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  )
}
