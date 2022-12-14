import { ButtonUnstyled } from '@mui/base'
import { Button } from '@mui/material'
import React, { createRef, useEffect, forwardRef, ForwardedRef } from 'react'

export interface ButtonUnstyledActions {
  focusVisible(): void
}

const CreateRefButton = (props) => {
  const inputRef = createRef<HTMLButtonElement>()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div>
      <button className="px-3 border border-black rounded-md border-spacing-2" ref={inputRef}>
        Button
      </button>
    </div>
  )
}

const ForwordRefButton = forwardRef((props, ref: ForwardedRef<any>) => {
  return (
    <>
      <button className="px-3 border border-black rounded-md border-spacing-2" ref={ref}>
        ForwardRef Button
      </button>
    </>
  )
})

const ImperativeButton = forwardRef(
  (props: { action?: React.Ref<ButtonUnstyledActions>; children? }, ref: ForwardedRef<any>) => {
    const buttonRef = React.createRef<HTMLInputElement>()

    const { action, ...other } = props

    React.useImperativeHandle(action, () => {
      return {
        focusVisible: () => {
          console.debug('focusVisible')
          buttonRef.current.focus()
          buttonRef.current.classList.add('focus:outline-orange-500')
          buttonRef.current.classList.remove('focus:outline-green-500')
        },
      }
    })

    return (
      <>
        <div>
          <button className="px-3 border border-black rounded-md border-spacing-2" ref={buttonRef}>
            useImperativeHandle Button
          </button>
        </div>
      </>
    )
  }
)

const useImperativeHandle = () => {
  const inputRef1 = createRef<any>()
  const inputRef2 = createRef<any>()

  const action = createRef<ButtonUnstyledActions>()
  const action2 = createRef<ButtonUnstyledActions>()

  const handleClick = () => {
    action2.current.focusVisible()
  }

  return (
    <>
      <div className="flex flex-col px-40 py-32 space-y-24">
        <Button onClick={handleClick}>TTT</Button>
        <ButtonUnstyled action={action2}>asdf</ButtonUnstyled>
        <div>
          <div className="flex items-center space-x-4">
            <p className="text-xs cursor-pointer text-slate-800 w-80">
              1. ????????? ?????? ??? focus / focus ?????? ????????? ??????
            </p>
            <CreateRefButton />
          </div>
          <p className="mt-2 text-xs text-slate-600">
            ?????? Button ???????????? ?????? ???????????? ???????????? ?????? ???, Focus??? ??????, ?????? Component????????? ????????? ?????? ??????.
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <p className="text-xs cursor-pointer text-slate-800 w-80" onClick={() => inputRef1.current.focus()}>
              2. click focus
            </p>
            <ForwordRefButton ref={inputRef1} />
          </div>
          <p className="mt-2 text-xs text-slate-600">
            ?????? Button ??????????????? ???????????? ref??? ??????????????????, ?????? ??????????????? ????????? ref??? ?????? ????????? ????????????.
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xs cursor-pointer text-slate-800 w-80" onClick={() => action.current.focusVisible()}>
                3. action click focus
              </p>
              <p
                className="text-xs line-through cursor-pointer text-slate-800 w-80"
                onClick={() => {
                  //   inputRef2.current.focus()
                  //   inputRef2.current.classList.add('focus:outline-green-500')
                  //   inputRef2.current.classList.remove('focus:outline-orange-500')
                }}
              >
                4. ref click focus
              </p>
            </div>
            <ImperativeButton action={action} ref={inputRef2} />
          </div>
          <p className="mt-2 text-xs text-slate-600">?????? Button ??????????????? ???????????? ref??? ????????? ???????????????.</p>
        </div>
      </div>
    </>
  )
}

export default useImperativeHandle
