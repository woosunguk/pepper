import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from 'src/lib/mongodb'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  console.debug(_req.query)
  const query = _req.query

  // Get data from your database
  const client = await clientPromise

  const db = client.db('pepper')
  const recipes = db.collection('ingredients')

  const curosr = await recipes.find({ name: { $regex: query.keyword, $options: 'i' } })

  res.status(200).json({
    total: await curosr.count(),
    data: await curosr
      .skip(query.page * query.per_page)
      .limit(parseInt(query.per_page))
      .toArray(),
  })
}
