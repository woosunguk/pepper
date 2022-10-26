import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useUI } from '../ui'
import { Button, FormLabel, TextField } from '@mui/material'

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

const RegistIngredientsModal = ({ className = '', title = '' }) => {
  const { enqueueModal, openModal, closeModal } = useUI()

  const [editedUserInformation, setEditedUserInformation] = useState({
    name: '',
  })

  const [ingredient, setIngredient] = useState({
    name: '',
  })

  const [errorMessages, setErrorMessages] = useState<{
    name: string[]
  }>({
    name: [],
  })

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
    <>
      <div className="bg-white rounded-lg dialog">
        <div className="flex">
          <div {...getRootProps({ className: 'dropzone max-w-sm w-full' })}>
            <aside className="space-y-2">{thumbs}</aside>
            <input {...getInputProps()} />
            {files.length == 0 && (
              <div className="flex flex-col items-center justify-center h-full text-xs text-gray-400 cursor-pointer">
                <p className="">Drag &apos;n&apos; drop some files here, or click to select files</p>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-medium text-gray-900 sm:pr-12">재료 등록하기</h2>

            <section aria-labelledby="information-heading" className="flex-1 mt-6">
              <h3 id="information-heading" className="sr-only">
                Product information
                {process.env.AZURE_STORAGE_CONNECTION_STRING}
              </h3>

              <div className="flex items-center space-x-3 font-medium text-gray-900">
                <FormLabel aria-label="dsf">이름</FormLabel>
                <TextField
                  variant="standard"
                  size="small"
                  value={ingredient.name}
                  onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                />
              </div>
            </section>

            <div className="flex justify-end px-5 py-5 space-x-2">
              <Button className="rounded-full" variant="outlined" size="small" onClick={() => closeModal()}>
                취소
              </Button>
              <Button
                className="rounded-full"
                variant="contained"
                size="small"
                color="secondary"
                onClick={async () => {
                  console.debug(files[0])

                  const formData = new FormData()
                  formData.append('image', files[0])
                  formData.append('name', ingredient.name)
                  formData.append('_method', 'PUT')

                  axios
                    .post(`/api/upload`, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    })
                    .then((res) => {
                      closeModal()
                    })
                }}
              >
                추가하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistIngredientsModal
