import * as React from 'react'
import {
  ButtonUnstyledOwnerState,
  ButtonUnstyledProps,
  ButtonUnstyledRootSlotProps,
  ButtonUnstyledTypeMap,
} from './ButtonUnstyled.type'
import { useButton, unstable_composeClasses as composeClasses } from '@mui/base'
import { getButtonUnstyledUtilityClass } from './buttonUnstyledClasses'
import useSlotProps from 'seoul/utils/useSlotProps'
import { WithOptionalOwnerState } from 'seoul/utils'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const useUtilityClasses = (ownerState: ButtonUnstyledOwnerState) => {
  const { active, disabled, focusVisible } = ownerState

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active'],
  }

  return composeClasses(slots, getButtonUnstyledUtilityClass, {})
}

const ButtonUnstyled = React.forwardRef(function ButtonUnstyled<
  BaseComponentType extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent']
>(props: ButtonUnstyledProps<BaseComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const {
    action,
    children,
    component,
    disabled,
    focusableWhenDisabled = false,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseLeave,
    slotProps = {},
    slots = {},
    ...other
  } = props

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>()

  const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    focusableWhenDisabled,
  })

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true)
        buttonRef.current!.focus()
      },
    }),
    [setFocusVisible]
  )

  const ownerState: ButtonUnstyledOwnerState = {
    ...props,
    active,
    focusableWhenDisabled,
    focusVisible,
  }

  const classes = useUtilityClasses(ownerState)
  const defaultElement = other.href || other.to ? 'a' : 'button'
  const Root: React.ElementType = component ?? slots.root ?? defaultElement
  const rootProps: WithOptionalOwnerState<ButtonUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  })

  console.debug('ownerState : ', ownerState)
  console.debug('rootProps :', rootProps)

  return <Root {...rootProps}>{children}</Root>
}) as OverridableComponent<ButtonUnstyledTypeMap>

export default ButtonUnstyled
