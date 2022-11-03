import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { ListSubheader, TextField } from '@mui/material'
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { $textContentRequiresDoubleLinebreakAtEnd } from 'lexical/LexicalUtils'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">이슈 유형</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          //   value={[]}
          value={issueName}
          //   value={[]}
          onChange={handleChange}
          input={<OutlinedInput label="Tag123213" value="asdfasdfasdf" />}
          renderValue={(selected) => {
            return (
              <>
                <div className="flex items-center space-x-3">
                  <p className="text-blue-500">{[...selected].shift()}</p>
                  <p>외</p>
                  <p className="text-orange-500" onClick={() => alert(1)}>
                    {selected.length}
                  </p>
                  <p>명</p>
                </div>
              </>
            )
          }}
          MenuProps={MenuProps}
        >
          <div className="sticky top-0 z-50 bg-white">
            <TextField
              size="small"
              placeholder="검색어 입력"
              value={keyword}
              fullWidth
              InputProps={{
                endAdornment: <MagnifyingGlassIcon className="w-4 h-4" />,
                className: 'text-sm text-gray-500 px-4 pb-2',
              }}
              variant="standard"
              sx={{ padding: '10px;' }}
              onChange={(e) => setKeyword(e.target.value)}
              //   onKeyDown={(e) => e.key !== 'Escape' && e.stopPropagation()}
            />
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
