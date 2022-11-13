import * as React from 'react'
import IssueSelect from '@/components/IssueSelect'
import { Button } from '@mui/material'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import StandaloneToggleButton from '@/components/ToggleButton'
import CustomizedTabs from '@/components/Tabs'
import CustomizedDividers from '@/components/ToggleButton2'
import PaperContentComponent from '@/components/DateRange'

const Index = () => {
  return (
    <>
      <div className="flex flex-col max-w-4xl px-8 pt-8 mx-auto lg:px-0">
        <div className="mb-4">
          <p className="underline underline-offset-8">32 Doors</p>
        </div>
        <div className="grid w-full gap-3 mx-auto lg:grid-cols-6">
          <div className="flex items-center justify-center min-h-[9rem] row-span-2  bg-yellow-300 rounded-md col-span-6 lg:col-span-3 lg:h-full">
            <IssueSelect />
          </div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1">
            <StandaloneToggleButton />
          </div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>

          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-3">
            <div className="px-4">
              <CustomizedTabs />
            </div>
          </div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-2">
            <PaperContentComponent />
          </div>
          <div className="flex p-8 min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-4 lg:row-span-3">
            <CustomizedDividers />
          </div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="relative flex items-center justify-center min-h-[9rem] bg-red-400 rounded-md lg:h-full col-span-6 lg:col-span-2">
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
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-white rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
          <div className="flex items-center justify-center min-h-[9rem] bg-black rounded-md lg:h-full col-span-6 lg:col-span-1"></div>
        </div>
      </div>
    </>
  )
}

export default Index
