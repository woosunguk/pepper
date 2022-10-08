import React from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

const posts = () => {
  return (
    <>
      <div className="bg-gray-200/30">
        <Editor />
      </div>
    </>
  )
}

export default posts
