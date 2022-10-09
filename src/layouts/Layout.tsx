import React from 'react'
import Image from 'next/image'

export const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-24">
      <Image
        className="rounded-full cursor-pointer"
        src="https://tistory3.daumcdn.net/tistory/571103/attach/c87f780fad0443338143eda499b54d37"
        width={30}
        height={30}
        layout="fixed"
        objectFit="contain"
        objectPosition="left"
        alt="jiran pic"
      />

      <div className="mt-3 text-gray-400">loading ...</div>
    </div>
  )
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-1 h-full bg-white">{children}</main>
}

export default Layout
