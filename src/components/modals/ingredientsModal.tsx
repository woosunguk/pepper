import React, { Fragment, useState } from 'react'
import { Combobox, Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ChevronRightIcon, MagnifyingGlassIcon, StarIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'

const people = [
  {
    id: 1,
    name: '카레가루',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: '-',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://previews.123rf.com/images/andreyst/andreyst1406/andreyst140600638/28955690-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%94%9C%EC%99%80-%EC%B9%B4%EB%A0%88-%EA%B0%80%EB%A3%A8.jpg',
  },
  // More people...
]

const recent = [people[0]]

const IngredientsModal = ({ open, handleClose }) => {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }
  console.debug(filteredPeople)

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 p-4 overflow-y-auto sm:p-6 md:p-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="max-w-5xl mx-auto overflow-hidden transition-all transform bg-white divide-y divide-gray-100 shadow-2xl rounded-xl ring-1 ring-black ring-opacity-5">
              <Combobox onChange={(person) => (window.location = person.profileUrl)}>
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="w-full h-12 pr-4 text-gray-800 placeholder-gray-400 bg-transparent border-0 pl-11 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    {(query === '' || filteredPeople.length > 0) && (
                      <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                        <div
                          className={clsx(
                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                            activeOption && 'sm:h-96'
                          )}
                        >
                          {query === '' && (
                            <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">Recent searches</h2>
                          )}
                          <div className="-mx-2 text-sm text-gray-700">
                            {(query === '' ? recent : filteredPeople).map((person) => {
                              console.debug(person)
                              return (
                                <Combobox.Option
                                  as="div"
                                  key={person.id}
                                  value={person}
                                  className={({ active }) =>
                                    clsx(
                                      'flex cursor-default select-none items-center rounded-md p-2',
                                      active && 'bg-gray-100 text-gray-900'
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <img src={person.imageUrl} alt="" className="flex-none w-6 h-6 rounded-full" />
                                      <span className="flex-auto ml-3 truncate">{person.name}</span>
                                      {active && (
                                        <ChevronRightIcon
                                          className="flex-none w-5 h-5 ml-3 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            })}
                          </div>
                        </div>

                        {activeOption && (
                          <div className="flex-col flex-none hidden w-4/6 overflow-y-auto divide-y divide-gray-100 h-96 sm:flex">
                            <div className="flex-none p-6 text-center">
                              <img src={activeOption.imageUrl} alt="" className="w-16 h-16 mx-auto rounded-full" />
                              <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                              <p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
                            </div>
                            <div className="flex justify-between flex-auto p-6">
                              <TextField id="standard-basic" label="용량" variant="standard" />
                              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">단위</InputLabel>
                                <Select
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  value={age}
                                  label="Age"
                                  onChange={handleChange}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={10}>g</MenuItem>
                                  <MenuItem value={20}>ml</MenuItem>
                                  <MenuItem value={30}>개</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="flex flex-col justify-between flex-auto p-6">
                              {/* <dl className="grid grid-cols-1 text-sm text-gray-700 gap-x-6 gap-y-3">
                                <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                                <dd>{activeOption.phone}</dd>
                                <dt className="col-end-1 font-semibold text-gray-900">URL</dt>
                                <dd className="truncate">
                                  <a href={activeOption.url} className="text-indigo-600 underline">
                                    {activeOption.url}
                                  </a>
                                </dd>
                                <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                                <dd className="truncate">
                                  <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                                    {activeOption.email}
                                  </a>
                                </dd>
                              </dl> */}
                              <button
                                type="button"
                                className="w-full px-4 py-2 mt-6 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                추가하기
                              </button>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}

                    {
                      <div className="px-6 text-sm text-center py-14 sm:px-14">
                        <UsersIcon className="w-6 h-6 mx-auto text-gray-400" aria-hidden="true" />
                        <p className="mt-4 font-semibold text-gray-900">식재료가 없습니다.</p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try again.
                        </p>
                        <Button className="mt-4">재료 등록하기</Button>
                      </div>
                    }
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default IngredientsModal
