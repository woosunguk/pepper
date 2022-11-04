import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { InputBase, TextField } from '@mui/material'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    sx: {
      width: '250px',
      maxHeight: `${ITEM_HEIGHT * 6 + ITEM_PADDING_TOP}px`,
      '.MuiList-root': {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
  },
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

// const issueTypes = [
//   {
//     value: 'all',
//     type: '',
//     title: '모든 표준 이슈 유형',
//     imageUrl: '',
//     checked: false,
//   },
//   {
//     value: 'sub-all',
//     type: '',
//     title: '모든 하위 작업 이슈 유형',
//     imageUrl: '',
//     checked: false,
//   },
//   {
//     value: 'bug',
//     type: 'issue',
//     title: '버그',
//     imageUrl: 'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
//     checked: false,
//   },
//   {
//     value: 'story',
//     type: 'issue',
//     title: '스토리',
//     imageUrl: 'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
//     checked: false,
//   },
//   {
//     type: 'issue',
//     value: 'epic',
//     title: '에픽',
//     imageUrl: 'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
//     checked: false,
//   },
//   {
//     value: 'work',
//     type: 'issue',
//     title: '작업',
//     imageUrl: 'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
//     checked: false,
//   },
//   {
//     value: 'sub-work',
//     type: 'sub-issue',
//     title: '하위 작업',
//     imageUrl: 'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium',
//     checked: false,
//   },
// ]

const Test = () => {
  const [issueName, setIssueName] = React.useState<string[]>([])

  const [issueTypes, setIssueTypes] = React.useState([
    {
      value: 'all',
      type: '',
      title: '모든 표준 이슈 유형',
      imageUrl: '',
      checked: false,
    },
    {
      value: 'sub-all',
      type: '',
      title: '모든 하위 작업 이슈 유형',
      imageUrl: '',
      checked: false,
    },
    {
      value: 'bug',
      type: 'issue',
      title: '버그',
      imageUrl:
        'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      checked: false,
    },
    {
      value: 'story',
      type: 'issue',
      title: '스토리',
      imageUrl:
        'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
      checked: false,
    },
    {
      type: 'issue',
      value: 'epic',
      title: '에픽',
      imageUrl:
        'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
      checked: false,
    },
    {
      value: 'work',
      type: 'issue',
      title: '작업',
      imageUrl:
        'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      checked: false,
    },
    {
      value: 'sub-work',
      type: 'sub-issue',
      title: '하위 작업',
      imageUrl:
        'https://99studio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium',
      checked: false,
    },
  ])

  const [keyword, setKeyword] = React.useState('')

  const handleChange = (event: SelectChangeEvent<typeof issueName>) => {
    const {
      target: { value },
    } = event
    setIssueTypes((issueTypes) =>
      issueTypes.map((issue) => (issue.value == value ? { ...issue, checked: !issue.checked } : issue))
    )

    setIssueName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const inputComponent = React.useRef<HTMLInputElement>(null)
  const [position, setPosition] = React.useState(0)

  React.useEffect(() => {
    setPosition(inputComponent.current ? inputComponent.current.getBoundingClientRect().left : 0)
  }, [inputComponent, issueName])

  return (
    <div className="flex items-center justify-center w-full pt-56 pb-56 mx-auto bg-white">
      <FormControl>
        <Select
          ref={inputComponent}
          id="demo-multiple-checkbox"
          sx={{
            '& .MuiSelect-select': {
              padding: '0px',
            },
          }}
          multiple
          size="small"
          value={issueName}
          onChange={handleChange}
          input={<InputBase className="flex items-center px-3 py-1 bg-gray-200 rounded-lg" size="small" />}
          displayEmpty
          MenuProps={{
            PaperProps: { sx: { left: `${position}px !important`, marginTop: '10px;' } },
          }}
          // MenuProps={MenuProps}
          renderValue={(selected) => {
            return (
              <>
                <div className="flex items-center ">
                  <p>유형</p>
                  <div className="flex items-center space-x-1">
                    {selected.length != 0 && (
                      <>
                        <p className="px-2">:</p>
                        <p className="">{issueTypes.find((issue) => issue.value == [...selected].shift()).title}</p>
                      </>
                    )}
                    {selected.length > 1 && (
                      <>
                        <p className="">외</p>
                        <p className="text-cyan-500" onClick={() => alert(1)}>
                          {selected.length - 1}
                        </p>
                        <p>개</p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )
          }}
        >
          <div className="sticky top-0 z-50 bg-white">
            <TextField
              size="small"
              placeholder="검색어 입력"
              value={keyword}
              fullWidth
              InputProps={{
                endAdornment: <MagnifyingGlassIcon className="w-4 h-4" />,
                className: 'text-sm text-gray-500 px-2 pb-2',
              }}
              variant="standard"
              sx={{ padding: '10px' }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <p
              className="px-4 pt-3 pb-2 text-xs cursor-pointer hover:underline underline-offset-4"
              onClick={() => {
                setIssueTypes((issueTypes) => issueTypes.map((issue) => ({ ...issue, checked: false })))
                setIssueName([])
              }}
            >
              선택한 항목 지우기
            </p>
          </div>

          {issueTypes
            .filter((issue) => issue.type == '')
            .filter((issue) => issue.title.includes(keyword))
            .map((issue) => (
              <MenuItem key={issue.value} value={issue.value}>
                <div className="flex items-center">
                  <Checkbox
                    checked={issueName.indexOf(issue.value) > -1}
                    size="small"
                    sx={{ padding: '0px', marginRight: '10px' }}
                  />
                  <img className="mr-1" src={issue.imageUrl} alt="" />
                  <ListItemText primary={issue.title} />
                </div>
              </MenuItem>
            ))}

          {keyword == '' && <p className="px-4 pt-3 pb-1">표준 이슈 유형</p>}
          {issueTypes
            .filter((issue) => issue.type == 'issue')
            .filter((issue) => issue.title.includes(keyword))
            .map((issue) => (
              <MenuItem key={issue.value} value={issue.value}>
                <div className="flex items-center">
                  <Checkbox
                    checked={issueName.indexOf(issue.value) > -1}
                    size="small"
                    sx={{ padding: '0px', marginRight: '10px' }}
                  />
                  <img className="mr-1" src={issue.imageUrl} alt="" />
                  <ListItemText primary={issue.title} />
                </div>
              </MenuItem>
            ))}

          {keyword == '' && <p className="px-4 pt-4 pb-1">하위 작업 이슈 유형</p>}
          {issueTypes
            .filter((issue) => issue.type == 'sub-issue')
            .filter((issue) => issue.title.includes(keyword))
            .map((issue) => (
              <MenuItem key={issue.value} value={issue.value}>
                <div className="flex items-center">
                  <Checkbox
                    checked={issueName.indexOf(issue.value) > -1}
                    size="small"
                    sx={{ padding: '0px', marginRight: '10px' }}
                  />
                  <img className="mr-1" src={issue.imageUrl} alt="" />
                  <ListItemText primary={issue.title} />
                </div>
              </MenuItem>
            ))}

          {/* {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  )
}

export default Test
