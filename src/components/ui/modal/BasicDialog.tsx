import clsx from 'clsx'
import React from 'react'

export interface DialogPropTypes {
  className?: string
  children: React.ReactNode
}

const BasicDialog = ({ className, children }: DialogPropTypes) => {
  return (
    <div
      className={clsx(
        className,
        'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6'
      )}
    >
      {children}
    </div>
  )
}
const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="text-lg font-bold">{children}</h2>
    </>
  )
}

BasicDialog.Title = Title

export default BasicDialog
