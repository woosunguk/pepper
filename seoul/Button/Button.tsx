import React from 'react'
import { styled, useThemeProps } from '../styles'
import { ButtonOwnerState } from './ButtonProps'

export const ButtonRoot = styled('button', {
  name: 'SeoulButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => {
  return [{}]
})

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'SeoulButton',
  })

  const {
    children,
    action,
    component = 'button',
    componentsProps = {},
    color: colorProp = 'primary',
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    startDecorator,
    endDecorator,
    loading = false,
    loadingPosition = 'center',
    loadingIndicator: loadingIndicatorProp,
    disabled,
    ...other
  } = props

  return <ButtonRoot>{children}</ButtonRoot>
})

export default Button
