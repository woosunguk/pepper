import FooterLayout from '@/layouts/FooterLayout'
import { Disclosure } from '@headlessui/react'
import { FolderIcon, HomeIcon, PencilIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline'
import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  RadioProps,
  Slider,
  TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import clsx from 'clsx'
import React, { Suspense, useDeferredValue, useMemo, useState } from 'react'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
})

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  )
}

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#' },
  {
    name: 'AAAAAA',
    icon: UsersIcon,
    current: true,
    children: [
      { name: '재료', href: '#', current: true },
      { name: '-', href: '#' },
      { name: '-', href: '#' },
    ],
  },
  {
    name: 'BBBBBBB',
    icon: FolderIcon,
    current: false,
    children: [
      { name: '-', href: '#' },
      { name: '-', href: '#' },
      { name: '-', href: '#' },
      { name: '-', href: '#' },
    ],
  },
]

const top100Films = () => [
  { title: '# TAG A', year: 1994 },
  { title: '# TAG BBB', year: 1972 },
  { title: '# TAG CC', year: 1974 },
  { title: '# TAG DDDD', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
]

const fetchIngredients = async (filters) => {
  const { data } = await axios.get(`/api/ingredients`, {
    params: filters,
  })

  return data
}

const SearchIngredients = ({ query }) => {
  console.debug('query', query)

  const ingredientsQuery = useQuery(['ingredients', query], () => fetchIngredients(query))

  if (ingredientsQuery.isLoading) {
    return <p>Loading...</p>
  }

  if (ingredientsQuery?.data.length == 0) {
    return <p>검색 결과가 없습니다.</p>
  }

  return (
    <>
      {ingredientsQuery?.data.map((item) => (
        <div key={item._id} className="flex justify-between py-2">
          <div className="flex items-start space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src={`https://cs110037ffe9463dc59.blob.core.windows.net/images/ingredients/${item._id}`}
            ></img>
            <div className="flex flex-col">
              <p>{item.name}</p>
              <div className="space-x-2 text-sm text-gray-500">
                <p>
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                  {item.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-16">
            <div className="flex space-x-2">
              <Chip label={'# TAG A'} size="small" />
              <Chip label={'# TAG BBB'} size="small" />
              <Chip label={'# TAG CC'} size="small" />
              <Chip label={'# TAG DDDDDDD'} size="small" />
            </div>
            <div>
              <IconButton>
                <PencilIcon className="w-4 h-4" />
              </IconButton>
              <IconButton>
                <TrashIcon className="w-4 h-4 text-red-500" />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const Ingredients = () => {
  const [filters, setFilters] = useState({
    keyword: '',
  })
  // const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(filters)

  const ingredientsQuery = useQuery(['ingredients'], () => fetchIngredients(filters))

  const onChangeKeyword = (event) => {
    const { value } = event.target

    setFilters({ ...filters, keyword: value })
    // startTransition(() => {
    //   setFilters({ ...filters, keyword: value })
    // })
  }

  const searchResult = useMemo(() => <SearchIngredients query={deferredQuery} />, [deferredQuery])

  return (
    <div className="flex flex-1 h-full">
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4"></div>
              <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <a
                        href="#"
                        className={clsx(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={clsx(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={clsx(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            )}
                          >
                            <item.icon
                              className="flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={clsx(
                                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                href={subItem.href}
                                className={clsx(
                                  subItem.current ? 'font-bold text-cyan-500' : '',
                                  'flex items-center w-full py-2 pr-2 text-sm font-medium text-gray-600 rounded-md group pl-11 hover:bg-gray-50 hover:text-gray-900'
                                )}
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
              {/* <nav className="flex-1 mt-5" aria-label="Sidebar">
                <div className="px-2 space-y-1">

                </div>
              </nav> */}
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
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 px-4 py-6 overflow-y-auto focus:outline-none xl:order-last sm:px-6 lg:px-8">
            {/* Start main area*/}
            <h1 className="text-4xl font-bold pb-14">검색 결과</h1>
            <div className="divide-y">
              <>
                <Suspense fallback="Loading results...">{searchResult}</Suspense>
              </>
            </div>
            {/* End main area */}
          </main>
          <aside className="relative flex-shrink-0 hidden overflow-y-auto border-r border-gray-200 w-96 xl:order-first xl:flex xl:flex-col">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <p className="font-bold">FILTER BY</p>
                <p className="text-blue-700">Clear Filter</p>
              </div>

              <div className="flex flex-col space-y-8">
                <div className="flex flex-col">
                  <FormControl>
                    <FormLabel className="mb-2">검색어</FormLabel>
                    <TextField size="small" onChange={onChangeKeyword} />
                  </FormControl>
                </div>
                <div className="flex flex-col">
                  <FormLabel>검색어</FormLabel>
                  <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-customized-radios">종류</FormLabel>
                    <RadioGroup defaultValue="female" aria-labelledby="demo-customized-radios" name="customized-radios">
                      <FormControlLabel value="female" control={<BpRadio />} label="야채" />
                      <FormControlLabel value="male" control={<BpRadio />} label="고기" />
                      <FormControlLabel value="other" control={<BpRadio />} label="생선" />
                      <FormControlLabel value="disabled" disabled control={<BpRadio />} label="(Disabled option)" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <FormLabel className="mb-4">Tags</FormLabel>
                  <Autocomplete
                    multiple
                    id="size-small-outlined-multi"
                    size="small"
                    options={top100Films()}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[top100Films()[13]]}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Ingredients

Ingredients.layoutProps = {
  Layout: FooterLayout,
}
