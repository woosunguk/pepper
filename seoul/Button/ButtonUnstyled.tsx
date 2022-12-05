import * as React from 'react'
import { ButtonUnstyledProps, ButtonUnstyledTypeMap } from './ButtonUnstyled.type'
import { useButton } from '@mui/base'

const ButtonUnstyled = React.forwardRef(function ButtonUnstyled<
  BaseComponentType extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent']
>(props: ButtonUnstyledProps<BaseComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const { children, focusableWhenDisabled = false, ...other } = props

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>()

  const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    focusableWhenDisabled,
  })

  React.useEffect(() => {
    console.debug(active, focusVisible)
  }, [active, focusVisible])

  console.debug(active)
  console.debug(focusVisible)
  console.debug(setFocusVisible)
  console.debug(getRootProps)

  return (
    <>
      <button>{children}</button>
    </>
  )
})

export default ButtonUnstyled
