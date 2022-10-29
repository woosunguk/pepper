import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import FooterLayout from '@/layouts/FooterLayout'
import { Button, TextField } from '@mui/material'

import IngredientsModal from '@/components/modals/ingredientsModal'
import { PlusIcon } from '@heroicons/react/24/outline'

import { useRouter } from 'next/router'
import { useUpdatePosts } from 'src/hooks/posts/useUpdatePosts'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import exampleTheme from '@/components/editor/themes/ExampleTheme'
import RecipeNodes from '@/components/editor/RecipeNodes'
import { EditorState, VERSION } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

type DocumentJSON = {
  editorState: EditorState
  lastSaved: number
  source: string | 'Lexical'
  version: typeof VERSION
}

const RecipeEditor = () => {
  const router = useRouter()

  const [editor] = useLexicalComposerContext()
  const updatePostsMutation = useUpdatePosts()

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

  const [post, setPost] = useState({
    title: '카레',
  })

  const handleUpdatePosts = async () => {
    const editorState = editor.getEditorState()
    const documentJSON: DocumentJSON = {
      editorState: editorState,
      lastSaved: new Date().getTime(),
      source: 'Lexical',
      version: VERSION,
    }

    updatePostsMutation.mutateAsync(
      {
        id: router.query.index,
        title: post.title,
        lexical: documentJSON,
      },
      {
        onSuccess: (res) => {},
      }
    )
  }

  return (
    <>
      <div className="">
        <div className="bg-gray-200/30">
          <TextField
            id="standard-basic"
            className="py-8"
            variant="standard"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
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
                {/* {ingredients.map((item) => (
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
                ))} */}
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
              if (editor) {
                const json = JSON.parse(
                  '{"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}},"lastSaved":1667049190240,"source":"Playground","version":"0.4.1"}'
                )
                const editorState = editor.parseEditorState(JSON.stringify(json.editorState))
                editor.setEditorState(editorState)
              }
            }}
          >
            초기화
          </Button>
          <Button variant="contained" color="primary" size="extra-small" onClick={handleUpdatePosts}>
            업데이트
          </Button>
          <Button
            variant="contained"
            size="extra-small"
            onClick={() => {
              router.push('/')
            }}
          >
            닫기
          </Button>
        </div>
      </div>
    </>
  )
}

const Posts = () => {
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)

  return (
    <>
      <LexicalComposer
        initialConfig={{
          namespace: 'Playground',
          theme: exampleTheme,
          nodes: [...RecipeNodes],
          onError(error) {
            throw error
          },
        }}
      >
        <RecipeEditor />
        <IngredientsModal open={open} handleClose={handleClose} />
      </LexicalComposer>
    </>
  )
}

export default Posts

Posts.layoutProps = {
  Layout: FooterLayout,
}
