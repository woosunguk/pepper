import { unstable_getServerSession } from 'next-auth'
import clientPromise from 'src/lib/mongodb'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const {
    method,
    query,
  }: {
    method: string
    query: {
      keyword: string
      page: string
      per_page: string
    }
  } = req

  const session = await unstable_getServerSession(req, res, authOptions)

  // Get data from your database
  const client = await clientPromise

  const db = client.db('pepper')
  const recipes = db.collection('recipes')

  if (method == 'GET') {
    const curosr = await recipes.find({ title: { $regex: query.keyword, $options: 'i' } })

    res.status(200).json({
      total: await curosr.count(),
      test: await recipes.countDocuments(),
      data: await curosr
        .skip(parseInt(query.page) * parseInt(query.per_page))
        .limit(parseInt(query.per_page))
        .toArray(),
    })
  } else if (method == 'POST') {
    const result = await recipes.insertOne({
      user: session.user,
      title: '제목 없음',
      status: 0,
    })

    res.status(200).json(result)
  } else {
    res.status(405)
  }
}
