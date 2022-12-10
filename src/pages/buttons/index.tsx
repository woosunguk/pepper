import { useRouter } from 'next/router'
import React from 'react'
import ButtonUnstyled from 'seoul/Button/ButtonUnstyled'

const Index = () => {
  const router = useRouter()
  return (
    <>
      <ul className="p-40 text-sm list-decimal list-inside text-slate-900">
        <ButtonUnstyled>ButtonUnstyled</ButtonUnstyled>

        <li className="cursor-pointer" onClick={() => router.push('/buttons/use-imperative-handle')}>
          ref, use-imperative-handle
        </li>
      </ul>
    </>
  )
}

export default Index
