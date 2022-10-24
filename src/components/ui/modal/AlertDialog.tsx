import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { useUI } from '../context'

interface AlertDialogPropTypes {
  title: string
  description?: string
  severity?: string
}

const AlertDialog = ({ title, description, severity }: AlertDialogPropTypes) => {
  const { closeModal } = useUI()

  const handleClose = () => {
    closeModal()
  }

  const textColor =
    severity === 'success' || severity === 'info'
      ? 'text-blue-500'
      : severity === 'warning'
      ? 'text-orange-500'
      : severity === 'error'
      ? 'text-red-500'
      : 'text-gray-900'

  const Icon =
    severity == 'success'
      ? CheckCircleIcon
      : severity == 'warning'
      ? ExclamationCircleIcon
      : severity == 'error'
      ? XCircleIcon
      : severity == 'info'
      ? InformationCircleIcon
      : null

  return (
    <>
      <div className="max-w-xl dialog min-w-[400px]">
        <div className="bg-white rounded-lg">
          <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
            <button
              type="button"
              className="text-gray-400 rounded-md hover:text-gray-500 focus:outline-none"
              onClick={() => closeModal(false)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex px-4 pt-5 pb-4 space-x-4 sm:p-6 sm:pb-4">
            <div>{Icon && <Icon className={clsx(textColor, 'h-5 w-5')} aria-hidden="true" />}</div>

            <div className="flex flex-col flex-grow mt-3 sm:mt-0 sm:text-left">
              <h3 className="mb-4 mr-12 text-lg font-medium leading-6 text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 break-all whitespace-pre-line">{description}</p>
            </div>
          </div>
          <div className="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleClose()}
              // ref={cancelButtonRef}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertDialog
