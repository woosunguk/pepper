import React from 'react'

import { ButtonUnstyledOwnProps } from '@mui/base'
import { OverrideProps } from '@mui/material/OverridableComponent'

export type ButtonUnstyledProps<D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent']> =
  OverrideProps<ButtonUnstyledTypeMap<{}, D>, D> & {
    component?: D
  }

export interface ButtonUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonUnstyledOwnProps
  defaultComponent: D
}
