import * as React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/joy'

import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'extra-small' },
          style: {
            height: 26,
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      ],
    },
  },
})

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    'extra-small': true
  }
}

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
        {/* @ts-ignore */}
        <SessionProvider session={pageProps.session}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Layout {...layoutProps}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StyledEngineProvider>
        </SessionProvider>
      </React.StrictMode>
    </>
  )
}
