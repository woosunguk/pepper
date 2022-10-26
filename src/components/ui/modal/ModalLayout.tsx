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
      <Transition.Root show={componentModal.length > 0} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={(e) => {}}
          onClick={(e: any) => {
            if ((e.target as HTMLElement).classList.contains('test')) {
              if (currentModal?.options?.closeConfirm) {
                setCloseConfirm(true)
              } else {
                closeModal()
              }
            }
          }}
        >
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
            <div className="flex items-end justify-center min-h-full p-4 text-center test sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-3xl overflow-hidden text-left transition-all transform">
                  {currentModal?.content}

                  <div className="p-2 text-xs text-white bg-gray-700">
                    <p>Dialog option</p>
                    <p>{JSON.stringify(currentModal?.options)}</p>
                  </div>

                  {/* {componentModal.map((modal) => (
                    <>
                      <p>{modal.key ?? '-'}</p>
                    </>
                  ))} */}

                  {/* {componentModal.map((modal) => modal)} */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

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
