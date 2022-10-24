import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, TextField } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { useUI } from '../context'

interface ConfirmDialogPropTypes {
  title: string
  description?: string
  severity?: string
  confirmText?: string
  onSubmit?: () => void
  onClose?: () => void
}

const ConfirmDialog = ({
  title,
  description,
  severity = 'error',
  confirmText,
  onSubmit,
  onClose,
}: ConfirmDialogPropTypes) => {
  const { closeModal } = useUI()

  const handleSubmit = () => {
    handleClose()

    return onSubmit && onSubmit()
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }

    closeModal()
  }

  const textColor =
    severity === 'success' || severity === 'info'
      ? 'text-blue-900'
      : severity === 'warning'
      ? 'text-orange-500'
      : severity === 'error' || severity === 'delete'
      ? 'text-red-500'
      : 'text-gray-900'

  const Icon =
    severity == 'success'
      ? CheckCircleIcon
      : severity == 'warning'
      ? ExclamationCircleIcon
      : severity == 'error'
      ? TrashIcon
      : severity == 'delete'
      ? TrashIcon
      : severity == 'info'
      ? InformationCircleIcon
      : null

  const id = 'woosunguk'

  return (
    <>
      <div className="max-w-3xl dialog min-w-[600px]">
        <div className="bg-white rounded-lg">
          <div className="flex px-4 pt-5 pb-4 space-x-4 sm:p-6 sm:pb-4">
            <div>{Icon && <Icon className={clsx(textColor, 'h-5 w-5')} aria-hidden="true" />}</div>
            <div className="flex flex-col flex-grow mt-3 sm:mt-0 sm:text-left">
              <h3
                className={clsx('mb-4 font-bold', {
                  'text-success': severity == 'success' || severity == 'info',
                  'text-warning': severity == 'warning',
                  'text-error': severity == 'error' || severity == 'delete',
                })}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-600 break-all whitespace-pre-line">{description}</p>
              {confirmText !== undefined && (
                <div className="mt-5">
                  <div className="flex space-x-2 text-xs">
                    <p className="text-blue-500">{confirmText}</p>
                    <p>문자열을 동일하게 입력하세요.</p>
                  </div>
                  <TextField id={id} variant="outlined" size="small"></TextField>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end px-5 py-5 space-x-2">
            <Button className="rounded-full" variant="outlined" size="small" onClick={() => handleClose()}>
              취소
            </Button>
            <Button
              className="rounded-full"
              variant="contained"
              size="small"
              color="secondary"
              // color={severity == 'info' ? 'success' : severity == 'delete' ? 'error' : severity}
              onClick={() => handleSubmit()}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDialog
