import * as React from 'react'
import ButtonUnstyled, { ButtonUnstyledOwnerState, ButtonUnstyledProps } from '@mui/base/ButtonUnstyled'

const Button = React.forwardRef(function Button(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonUnstyled
      {...props}
      // @ts-ignore
      componentsProps={{
        root: (state: ButtonUnstyledOwnerState) => ({
          className: `hover:text-cyan-500 transition-colors ${
            state.focusVisible ? 'outline-0 ring-2 ring-red-500' : ''
          }`,
        }),
      }}
      ref={ref}
    />
  )
})

export default Button
