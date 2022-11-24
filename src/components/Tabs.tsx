import * as React from 'react'
import { styled } from '@mui/material/styles'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Chip } from '@mui/material'
import { blue, red } from '@mui/material/colors'

export const JiransoTabs = styled(Tabs)({
  minHeight: '33px',
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: blue[900],
  },
  [`& .${tabsClasses.scrollButtons}`]: {
    '&.Mui-disabled': { opacity: 0.3 },
  },
})

export const JiransoTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  padding: 1,
  minHeight: '33px',
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(3),
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: '12px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: blue[900],
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}))

interface StyledTabProps {
  icon?: any
  label: any
}

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <JiransoTabs value={value} onChange={handleChange} aria-label="ant example">
        <JiransoTab label="작업 항목" />
        <JiransoTab label="확인함" />
        <JiransoTab
          label={
            <div className="flex items-center2">
              <p className="mr-2">나에게 할당됨</p>
              <Chip
                label="4"
                sx={{
                  height: 16,
                  width: 16,
                  '& .MuiChip-label': {
                    padding: 0,
                  },
                }}
                size="small"
              />
            </div>
          }
        />
        <JiransoTab label="별표 표시됨" />
      </JiransoTabs>
    </Box>
  )
}
