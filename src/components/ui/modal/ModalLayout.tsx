// @ts-nocheck
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { Fragment, useEffect, useState } from 'react'
import { useUI } from '../context'

const ModalLayout = () => {
  const { displayModal, enqueueModal, displayCloseConfirm, setCloseConfirm, componentModal, closeModal } = useUI()
  const [currentModal, setCurrentModal] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setCurrentModal(componentModal[componentModal.length - 1])
  }, [componentModal])

  if (!currentModal) {
    return <></>
  }

  console.debug(displayCloseConfirm, setCloseConfirm)

  return (
    <>
      <Dialog
        as="div"
        className="relative z-40"
        open={componentModal.length > 0}
        onClose={() => {}}
        onClick={(e: any) => {
          if ((e.target as HTMLElement).classList.contains('dialog-overlay')) {
            if (currentModal?.options?.closeConfirm) {
              setCloseConfirm(true)
            } else {
              closeModal()
            }
          }
        }}
      >
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-500 opacity-25"
          onClick={() => {
            console.debug('1111111')
          }}
        />

        <div className="fixed inset-0 overflow-y-auto z-5 ">
          <div
            className={clsx('flex w-full min-h-screen p-4 text-center dialog-overlay min-w-max', {
              'items-center justify-center':
                currentModal?.options?.position == null || currentModal?.options?.position == 'center',
              'items-start justify-center': currentModal?.options?.position == 'top',
              'items-end justify-center': currentModal?.options?.position == 'bottom',
              'items-center justify-end': currentModal?.options?.position == 'right',
              'items-center justify-start': currentModal?.options?.position == 'left',
              'items-start justify-end': currentModal?.options?.position == 'top-right',
              'items-start justify-start': currentModal?.options?.position == 'top-left',
              'items-end justify-end': currentModal?.options?.position == 'bottom-right',
              'items-end justify-start': currentModal?.options?.position == 'bottom-left',
            })}
          >
            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span className="hidden w-2/4 sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span> */}

            <div
              className={clsx(
                {
                  'min-w-fit': currentModal?.options?.size == null,
                  'w-128': currentModal?.options?.size == 'xl',
                  'w-256': currentModal?.options?.size == '5xl',
                },
                'relative dialog'
              )}
            >
              {currentModal?.content}
              <div className="p-2 text-white bg-gray-700">
                <p className="text-xs">aaaaaaaaaaaaaaaaaaa</p>
              </div>

              {/* {componentModal.map((modal) => modal)} */}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 flex space-x-2">
          {componentModal.map((modal) => (
            <>
              <p>{modal.key ?? '-'}</p>
            </>
          ))}
        </div>
      </Dialog>

      <Transition.Root show={displayCloseConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setCloseConfirm}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                      <CheckIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        창 닫을래?
                      </Dialog.Title>
                      <div className="mt-2">{/* <p className="text-sm text-gray-500">창 닫을래?</p> */}</div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        setCloseConfirm(false)
                        closeModal()
                      }}
                    >
                      닫기
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setCloseConfirm(false)}
                    >
                      아니
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ModalLayout
