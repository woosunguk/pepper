// @ts-nocheck
import { styled, useThemeProps } from '@mui/system'
import React from 'react'

// import { styled, useThemeProps } from '../styles'
import { ButtonOwnerState } from './ButtonProps'

export const ButtonRoot = styled('button', {
  name: 'SeoulButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => {
  return [{}]
})

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'SeoulButton',
  })

  return <ButtonRoot>Button</ButtonRoot>
})

export default Button
