import React from 'react'
import ButtonUnstyled from 'seoul/Button/ButtonUnstyled'

const Test = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center flex-1 bg-slate-700">
          <ButtonUnstyled>children</ButtonUnstyled>
        </div>
      </div>
    </>
  )
}

export default Test
