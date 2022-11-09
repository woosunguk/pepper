import * as React from 'react'
import IssueSelect from '@/components/IssueSelect'
import { Button } from '@mui/material'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'

const Index = () => {
  return (
    <>
      <div className="flex items-center w-full h-full max-w-4xl mx-auto">
        <div className="flex flex-col flex-1">
          <div className="mb-4">
            <p className="underline underline-offset-8">32 Doors</p>
          </div>
          <div className="grid grid-cols-6 grid-rows-6 gap-4">
            <div className="flex items-center justify-center col-span-3 bg-yellow-300 shadow-lg rounded-xl">
              <div className="p-8">
                <IssueSelect />
              </div>
            </div>
            <div className="flex items-center justify-center bg-green-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-green-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="relative flex items-center justify-center col-span-2 bg-red-400 shadow-lg rounded-xl">
              <Button className="flex items-center" variant="contained" color="error">
                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                <p>Emergency</p>
              </Button>

              <div className="absolute flex items-center bottom-2 right-3">
                <img
                  className="w-4 h-4 mr-1"
                  src="https://lh3.googleusercontent.com/a/ALm5wu2ZLIGHEuLmOwC-zxKV3RqDHw9XzdBTYbJBgWhH=s96-c"
                />
                <p className="text-xs">엄지</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-indigo-300 shadow-lg rounded-xl"></div>
            <div className="flex items-center justify-center bg-black shadow-lg rounded-xl">
              <div className="w-32 h-32"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
