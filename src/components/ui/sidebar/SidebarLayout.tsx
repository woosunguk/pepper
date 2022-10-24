import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useUI } from '../context'

const SidebarLayout = () => {
  const { displaySidebar, closeSidebar, componentSidebar } = useUI()

  return (
    <Transition.Root show={displaySidebar} as={Fragment}>
      <Dialog as="div" className="fixed z-30 overflow-hidden" onClose={() => {}}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay
            className="fixed inset-0 bg-gray-500 opacity-25"
            onClick={() => {
              closeSidebar()
            }}
          />

          <div className="fixed inset-y-0 right-0 flex pointer-events-none">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto">{componentSidebar}</div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SidebarLayout
