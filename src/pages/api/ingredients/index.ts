import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from 'src/lib/mongodb'

export default async function handler(_req, res) {
  const query: {
    keyword: string
    page: string
    per_page: string
  } = _req.query

  // Get data from your database
  const client = await clientPromise

  const db = client.db('pepper')
  const recipes = db.collection('ingredients')

  const curosr = await recipes.find({ name: { $regex: query.keyword, $options: 'i' } })

  res.status(200).json({
    total: await curosr.count(),
    data: await curosr
      .skip(parseInt(query.page) * parseInt(query.per_page))
      .limit(parseInt(query.per_page))
      .toArray(),
  })
}
