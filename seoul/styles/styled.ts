import { createStyled } from '@mui/system'
// import { Theme } from './types'
// import defaultTheme from './defaultTheme'
// import styleFunctionSx from './styleFunctionSx'
import { createTheme } from '@mui/material'

const defaultTheme = createTheme({
  // your custom theme values
})

const styled = createStyled({ defaultTheme })

export default styled
