import { BlobServiceClient } from '@azure/storage-blob'
import multiparty from 'multiparty'
import fs from 'fs'
import clientPromise from 'src/lib/mongodb'

type MultipartyType = {
  fields: any
  files: {
    image: {
      fieldName: string
      originalFilename: string
      path: string
      headers: object
      size: number
    }[]
  }
}

export default async function _(req, res) {
  const form = new multiparty.Form()

  const formData = await new Promise<MultipartyType>((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err })
      resolve({ fields, files })
    })
  })

  const client = await clientPromise
  const db = client.db('pepper')
  const ingredients = db.collection('ingredients')

  // 저장
  const result = await ingredients.insertOne({ name: formData.fields.name })
  const insertedId = result.insertedId.toString()

  // 업로드
  const image = formData.files.image[0]
  const imageBinaryData = fs.readFileSync(image.path)

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
  const containerClient = blobServiceClient.getContainerClient('images')
  const blockBlobClient = containerClient.getBlockBlobClient('ingredients/' + insertedId)
  const uploadBlobResponse = await blockBlobClient.upload(imageBinaryData, image.size)

  return res.status(200).json(uploadBlobResponse)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
