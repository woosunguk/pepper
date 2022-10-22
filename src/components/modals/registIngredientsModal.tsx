import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const product = {
  name: "Women's Basic Tee",
  price: '카레',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
  imageAlt: "Back of women's Basic Tee in black.",
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: false },
  ],
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

const RegistIngredientsModal = () => {
  const [open, setOpen] = useState(true)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      console.debug(acceptedFiles)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(true)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full text-base text-left transition transform md:my-8 md:max-w-2xl md:px-4 lg:max-w-2xl">
                <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute text-gray-400 top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>

                  <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div
                      className={clsx(
                        'h-full overflow-hidden aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5 cursor-pointer',
                        files.length == 0 && 'border border-dashed rounded-lg'
                      )}
                    >
                      <div className="" {...getRootProps({ className: 'dropzone h-full' })}>
                        <section className="container flex flex-col justify-center h-full">
                          <aside className="space-y-2">{thumbs}</aside>
                          <input {...getInputProps()} />
                          {files.length == 0 && (
                            <div className="p-6 text-xs text-gray-400">
                              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                            </div>
                          )}
                        </section>
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-xl font-medium text-gray-900 sm:pr-12">재료 등록하기</h2>

                      <section aria-labelledby="information-heading" className="mt-1">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                          {process.env.AZURE_STORAGE_CONNECTION_STRING}
                        </h3>

                        <p className="font-medium text-gray-900">{product.price}</p>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-8">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-8 py-2 mt-8 text-base text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={async () => {
                            console.debug(files[0])

                            const formData = new FormData()
                            formData.append('image', files[0])
                            formData.append('name', '카레')
                            formData.append('_method', 'PUT')

                            axios
                              .post(`/api/upload`, formData, {
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                },
                              })
                              .then((res) => {})
                          }}
                        >
                          추가하기
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RegistIngredientsModal
