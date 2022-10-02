import * as React from 'react'
import { CssVarsProvider, StyledEngineProvider } from '@mui/joy'

import customTheme from '../../theme'
import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  components: {},
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  )
}

export default MyApp
