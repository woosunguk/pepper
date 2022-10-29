import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { getProviders, getSession } from 'next-auth/react'
import clientPromise from 'src/lib/mongodb'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  console.debug(req.headers)
  const {
    method,
    query: { postId },
  } = req

  const session = await unstable_getServerSession(req, res, authOptions)
  console.debug('session: ', session)

  // Get data from your database
  const client = await clientPromise

  const db = client.db('pepper')
  const recipes = db.collection('recipes')

  if (method == 'PUT') {
    const result = await recipes.updateOne(
      { _id: new ObjectId(postId.toString()) },
      {
        $set: {
          title: req.body.title ?? '제목 없음',
          posts: req.body.posts,
          status: 1,
        },
      }
    )

    res.status(200).json(result)
  } else {
    res.status(405)
  }
}
