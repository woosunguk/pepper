import React from 'react'
import dynamic from 'next/dynamic'
import FooterLayout from '@/layouts/FooterLayout'
import { Avatar, Button, IconButton, TextField } from '@mui/material'

import IngredientsModal from '@/components/modals/ingredientsModal'
import { PlusIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import clientPromise from 'src/lib/mongodb'
import { InferGetServerSidePropsType } from 'next'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise

    const db = client.db('pepper')
    const recipes = db.collection('recipes')

    const test = await recipes.find({ id: 'replace_with_new_document_id' })

    console.debug('DATA:', await test.toArray())
    console.debug('COUNT:', await test.count())

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

const Posts = ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.debug('isConnected', isConnected)
  const ingredients = [
    {
      title: '카레가루',
      description: '',
      volume: '100',
      volume_unit: 'g',
      image_src:
        'https://previews.123rf.com/images/andreyst/andreyst1406/andreyst140600638/28955690-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%94%9C%EC%99%80-%EC%B9%B4%EB%A0%88-%EA%B0%80%EB%A3%A8.jpg',
    },
    {
      title: '양파',
      description: '',
      volume: '1',
      volume_unit: '개',
      image_src: 'https://health.chosun.com/site/data/img_dir/2020/12/16/2020121601824_0.jpg',
    },
    {
      title: '당근',
      description: '',
      volume: '1',
      volume_unit: '개',
      image_src: 'https://static.megamart.com/product/image/0116/01160796/01160796_1_960.jpg',
    },
    {
      title: '감자',
      description: '',
      volume: '1',
      volume_unit: '개',
      image_src: 'http://health.chosun.com/site/data/img_dir/2020/05/07/2020050702573_0.jpg',
    },
    {
      title: '돼지고기',
      description: '삼겹살, 앞다리, 뒷다리',
      volume: '100',
      volume_unit: 'g',
      image_src: 'https://cdn.mkhealth.co.kr/news/photo/202101/51824_52458_4142.jpg',
    },
    {
      title: '진간장',
      description: '',
      volume: '15',
      volume_unit: 'ml',
      image_src: 'https://www.sempio.com/image/ZH/XA/2020031309591107743a47faa-d242-4a87-b1b2-73f2a39e90a3.png',
    },
    {
      title: '케첩',
      description: '',
      volume: '30',
      volume_unit: 'ml',
      image_src: 'https://m.ichibanhouse.com/web/product/big/202012/684611a792931870785cd9245c95d3e1.jpg',
    },
    {
      title: '버터',
      description: '',
      volume: '',
      volume_unit: '',
      image_src: 'https://img-cf.kurly.com/shop/data/goodsview/20220620/gv10000328295_1.jpg',
    },
    {
      title: '후추',
      description: '',
      volume: '',
      volume_unit: '',
      image_src: 'https://img.danawa.com/prod_img/500000/038/789/img/2789038_1.jpg?shrink=330:330&_v=20161108190618',
    },
    {
      title: '식용유',
      description: '',
      volume: '',
      volume_unit: '',
      image_src: 'https://img.danawa.com/prod_img/500000/606/755/img/1755606_1.jpg?shrink=330:330&_v=20200910162546',
    },
    {
      title: '물',
      description: '',
      volume: '700',
      volume_unit: 'ml',
      image_src: 'https://t1.daumcdn.net/cfile/tistory/99B5EC335982A2BF18',
    },
  ]

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className="">
        <div className="bg-gray-200/30">
          <TextField
            id="standard-basic"
            className="py-8"
            variant="standard"
            value={'돼지고기 카레'}
            fullWidth
            inputProps={{ style: { fontSize: 40, fontWeight: 'bold' } }}
          />

          <div className="flex flex-col">
            <section className="mb-8">
              <div className="flex items-center border-b">
                <p className="font-bold">재료</p>
                <Button size="small" color="secondary" onClick={handleOpen}>
                  <PlusIcon className="w-4 h-4" />
                  <p className="text-xs">추가하기</p>
                </Button>
              </div>
              <div className="flex flex-wrap space-x-10 space-x-reverse">
                {ingredients.map((item) => (
                  <div className="flex items-center mb-2 mr-4" key={item.title}>
                    <Avatar alt={item.title} src={item.image_src} sx={{ width: 24, height: 24 }} />
                    <div className="ml-2">
                      <div className="flex justify-start">
                        <p className="text-xs font-bold">{item.title}</p>
                        <p className="text-[0.5rem] ml-1">
                          {item.volume}
                          {item.volume_unit}
                        </p>
                      </div>
                      <p className="text-[0.5rem] text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="flex">
              <div className="flex-1">
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-violet-700">
        <div className="flex items-center justify-end px-20 py-1 space-x-3">
          <Button
            variant="contained"
            color="primary"
            size="extra-small"
            onClick={() => {
              axios.post('/api/test')
            }}
          >
            업데이트
          </Button>
          <Button variant="contained" size="extra-small">
            닫기
          </Button>
        </div>
      </div>

      <IngredientsModal open={open} handleClose={handleClose} />
    </>
  )
}

export default Posts

Posts.layoutProps = {
  Layout: FooterLayout,
}
