import React from 'react'

import { ButtonUnstyledOwnProps } from '@mui/base'
import { OverrideProps, Simplify } from '@mui/types'
import { UseButtonRootSlotProps } from './useButton.types'
// import { OverrideProps } from '@mui/material/OverridableComponent'

export type ButtonUnstyledProps<D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent']> =
  OverrideProps<ButtonUnstyledTypeMap<{}, D>, D> & {
    component?: D
  }

export interface ButtonUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonUnstyledOwnProps
  defaultComponent: D
}

export type ButtonUnstyledOwnerState = ButtonUnstyledOwnProps & {
  active: boolean
  focusVisible: boolean
}

export type ButtonUnstyledRootSlotProps = Simplify<
  UseButtonRootSlotProps & {
    ownerState: ButtonUnstyledOwnerState
    className?: string
    children?: React.ReactNode
  }
>
