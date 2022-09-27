import * as React from "react";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy";

import customTheme from "../../theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <CssVarsProvider disableTransitionOnChange theme={customTheme}>
            <Component {...pageProps} />
          </CssVarsProvider>
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  );
}

export default MyApp;
