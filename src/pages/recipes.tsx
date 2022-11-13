import PaperContentComponent from '@/components/DateRange'
import IssueSelect from '@/components/IssueSelect'
import FooterLayout from '@/layouts/FooterLayout'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment, useDeferredValue, useMemo, useState } from 'react'
import { usePosts } from 'src/hooks/posts/usePosts'
import top100Films from 'src/utils/top100'

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

const filters2 = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]

const Post = ({ item }) => {
  return (
    <div key={item._id} className="px-5 py-4 my-3 bg-gray-200 rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold">{item.title}</p>
          {item.status == 0 && <Chip label="출판 전" size="small" color="secondary" />}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {ingredients.map((item) => (
            <div className="flex items-center" key={item.title}>
              <Avatar alt={item.title} src={item.image_src} sx={{ width: 20, height: 20 }} />
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Image src={item.user.image} width={20} height={20} alt="" />
              <p>{item.user.name}</p>
              <p>|</p>
              <p>2020.10.30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Posts = ({ posts }) => {
  const router = useRouter()

  if (posts == undefined) {
    return <></>
  }

  return (
    <>
      <div>
        {posts
          ?.filter((item) => {
            return item.status == 0
          })
          .map((item) => (
            <div key={item._id} onClick={() => router.push(`/posts/${item._id}`)}>
              <Post item={item} />
            </div>
          ))}
      </div>
      <div className="my-8">
        <hr />
      </div>
      <div>
        {posts
          ?.filter((item) => {
            return item.status == 1
          })
          .map((item) => (
            <div key={item._id} onClick={() => router.push(`/posts/${item._id}`)}>
              <Post item={item} />
            </div>
          ))}
      </div>
    </>
  )
}

const Index = () => {
  const { data: session } = useSession()

  const [filters, setFilters] = useState({
    keyword: '',
    page: 0,
    per_page: 10,
  })
  // const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(filters)

  const posts = usePosts({
    filters,
  })

  console.debug(deferredQuery)

  const onChangeKeyword = (event) => {
    const { value } = event.target

    setFilters({ ...filters, keyword: value })
    // startTransition(() => {
    //   setFilters({ ...filters, keyword: value })
    // })
  }

  const handleSearch = () => {
    posts.refetch()
  }

  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <div className="flex flex-1 h-full">
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 bg-gray-100 border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4"></div>
              <nav className="flex-1 mt-5" aria-label="Sidebar">
                <div className="px-2 space-y-1"></div>
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
              <a href="#" className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block rounded-full h-9 w-9"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <div className="p-8">
          <div>
            {/* Filters */}
            <Disclosure
              as="section"
              aria-labelledby="filter-heading"
              className="grid items-center border-t border-b border-gray-200"
            >
              <h2 id="filter-heading" className="sr-only">
                Filters
              </h2>
              <div className="relative col-start-1 row-start-1 py-4">
                <p>FILTER</p>
                <div className="flex items-center justify-start mb-4 space-x-4">
                  <IssueSelect />
                  <PaperContentComponent />

                  <TextField
                    className="w-60"
                    size="small"
                    fullWidth
                    value={filters.keyword}
                    onChange={onChangeKeyword}
                  />
                  <Button variant="contained" color="secondary" onClick={handleSearch}>
                    검색
                  </Button>
                </div>
                <div className="flex justify-between space-x-6 text-sm divide-x divide-gray-200">
                  <div className="flex">
                    <div>
                      <Disclosure.Button className="flex items-center font-medium text-gray-700 group">
                        <FunnelIcon
                          className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        2 Filters
                      </Disclosure.Button>
                    </div>
                    <div className="pl-6">
                      <button type="button" className="text-gray-500">
                        Clear all
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Menu as="div" className="relative inline-block">
                      <div className="flex">
                        <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                          Sort : 날짜
                          <ChevronDownIcon
                            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <a
                                    href={option.href}
                                    className={clsx(
                                      option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    {option.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="py-10 border-t border-gray-200">
                <div className="grid grid-cols-2 px-4 mx-auto text-sm max-w-7xl gap-x-4 sm:px-6 md:gap-x-6 lg:px-8">
                  <div className="grid grid-cols-1 auto-rows-min gap-y-10 md:grid-cols-2 md:gap-x-6">
                    <fieldset>
                      <legend className="block font-medium">Price</legend>
                      <div className="pt-6 space-y-6 sm:space-y-4 sm:pt-4">
                        {filters2.price.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                              id={`price-${optionIdx}`}
                              name="price[]"
                              defaultValue={option.value}
                              type="checkbox"
                              className="flex-shrink-0 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              defaultChecked={option.checked}
                            />
                            <label htmlFor={`price-${optionIdx}`} className="flex-1 min-w-0 ml-3 text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="block font-medium">Color</legend>
                      <div className="pt-6 space-y-6 sm:space-y-4 sm:pt-4">
                        {filters2.color.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                              id={`color-${optionIdx}`}
                              name="color[]"
                              defaultValue={option.value}
                              type="checkbox"
                              className="flex-shrink-0 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              defaultChecked={option.checked}
                            />
                            <label htmlFor={`color-${optionIdx}`} className="flex-1 min-w-0 ml-3 text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <div className="grid grid-cols-1 auto-rows-min gap-y-10 md:grid-cols-2 md:gap-x-6">
                    <fieldset>
                      <legend className="block font-medium">Size</legend>
                      <div className="pt-6 space-y-6 sm:space-y-4 sm:pt-4">
                        {filters2.size.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                              id={`size-${optionIdx}`}
                              name="size[]"
                              defaultValue={option.value}
                              type="checkbox"
                              className="flex-shrink-0 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              defaultChecked={option.checked}
                            />
                            <label htmlFor={`size-${optionIdx}`} className="flex-1 min-w-0 ml-3 text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="block font-medium">Category</legend>
                      <div className="pt-6 space-y-6 sm:space-y-4 sm:pt-4">
                        {filters2.category.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                              id={`category-${optionIdx}`}
                              name="category[]"
                              defaultValue={option.value}
                              type="checkbox"
                              className="flex-shrink-0 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              defaultChecked={option.checked}
                            />
                            <label htmlFor={`category-${optionIdx}`} className="flex-1 min-w-0 ml-3 text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 px-4 py-6 overflow-y-auto focus:outline-none xl:order-last sm:px-6 lg:px-8">
            {/* Start main area*/}
            <h1 className="text-4xl font-bold py-14">레시피</h1>
            <div className="">
              <Posts posts={posts?.data?.data} />
            </div>
            {/* End main area */}
          </main>
          <aside className="relative flex-shrink-0 hidden overflow-y-auto border-r border-gray-200 w-96 xl:order-first xl:flex xl:flex-col">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-8">
              <div className="h-full border-2 border-gray-200 border-dashed rounded-lg">
                {/* <Posts posts={posts?.data?.data} /> */}
              </div>
            </div>

            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Index

Index.layoutProps = {
  Layout: FooterLayout,
}
