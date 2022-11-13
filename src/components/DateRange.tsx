import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro'
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { useWindowSize } from 'rooks'

const RangeShortcut = {
  thisWeek: 'THIS_WEEK',
  lastWeek: 'LAST_WEEK',
  last7Days: 'LAST_7_DAYS',
  currentMonth: 'CURRENT_MONTH',
  nextMonth: 'NEXT_MONTH',
  reset: 'RESET',
}

type RangeShortcutType = keyof typeof RangeShortcut

const rangeShortcuts = [
  {
    range: RangeShortcut.thisWeek,
    label: 'This week',
  },
  {
    range: RangeShortcut.lastWeek,
    label: 'Last week',
  },
  {
    range: RangeShortcut.last7Days,
    label: 'Last 7 days',
  },
  {
    range: RangeShortcut.currentMonth,
    label: 'Current month',
  },
  {
    range: RangeShortcut.nextMonth,
    label: 'Next month',
  },
  {
    range: RangeShortcut.reset,
    label: 'Reset',
  },
]

const buildHandleRangeClick =
  (setValue: React.Dispatch<React.SetStateAction<DateRange<Dayjs>>>) => (range: RangeShortcutType) => {
    const today = dayjs()
    switch (range) {
      case RangeShortcut.thisWeek:
        setValue([today.startOf('week'), today.endOf('week')])
        break
      case RangeShortcut.lastWeek:
        setValue([today.startOf('week').subtract(1, 'week'), today.endOf('week').subtract(1, 'week')])
        break
      case RangeShortcut.last7Days:
        setValue([today.subtract(1, 'week'), today])
        break
      case RangeShortcut.currentMonth:
        setValue([today.startOf('month'), today.endOf('month')])
        break
      case RangeShortcut.nextMonth:
        setValue([today.startOf('month').add(1, 'month'), today.endOf('month').add(1, 'month')])
        break
      case RangeShortcut.reset:
        setValue([null, null])
        break
      default:
        break
    }
  }

const RangeShortcutsPanel: React.FC<{
  setValue?: React.Dispatch<React.SetStateAction<DateRange<Dayjs>>>
  children: React.ReactNode
}> = ({ setValue, children }) => {
  const handleRangeClick = React.useCallback(
    (range: RangeShortcutType) => setValue && buildHandleRangeClick(setValue)(range),
    [setValue]
  )
  return (
    <React.Fragment>
      <Box sx={{ m: 2 }} display="flex" gap={2}>
        <div>
          <Typography variant="overline">Date range shortcuts</Typography>
          <List>
            {rangeShortcuts.map(({ range, label }) => (
              <ListItem key={range} disablePadding>
                <ListItemButton onClick={() => handleRangeClick(range as RangeShortcutType)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <Divider orientation="vertical" />
      </Box>
      {children}
    </React.Fragment>
  )
}

export default function PaperContentComponent() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null])
  const [value2, setValue2] = React.useState<DateRange<Dayjs>>([null, null])
  const [open, setOpen] = React.useState<boolean>(false)

  const updateValue = () => {
    console.debug(value)
    setValue2(value)
    setOpen(!open)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={4} alignItems="center">
          <DateRangePicker
            onChange={(newValue) => setValue(newValue)}
            value={value}
            renderInput={(startProps, endProps) => {
              console.debug(startProps)
              return (
                <div className="flex items-center cursor-pointer">
                  {/* <React.Fragment>
                    <TextField
                      // sx={{ pointer: 'cursor' }}
                      {...{
                        ...startProps,
                        label: '',
                        inputProps: {
                          ...startProps.inputProps,
                          // readOnly: true,
                          value: `${value2[0]?.format('YYYY.MM.DD')} ~ ${value2[1]?.format('YYYY.MM.DD')}`,
                        },
                      }}
                    />
                  </React.Fragment> */}

                  <Button
                    className="flex items-center px-3 space-x-4 bg-gray-200 rounded-md cursor-pointer"
                    size="small"
                    onClick={() => setOpen(!open)}
                    ref={startProps.inputRef as React.Ref<HTMLInputElement>}
                  >
                    <p>생성일 :</p>
                    {value2[0] == null || value2[1] == null ? (
                      <p>모두</p>
                    ) : (
                      <div className="flex items-center text-sm">
                        <p>{value2[0]?.format('YYYY.MM.DD')}</p>
                        <p className="mx-2">~</p>
                        <p>{value2[1]?.format('YYYY.MM.DD')}</p>
                      </div>
                    )}
                  </Button>
                </div>
              )
            }}
            components={{
              PaperContent: (props) => (
                <>
                  <RangeShortcutsPanel {...props}>
                    <div className="flex flex-col">
                      {props.children}

                      <div className="flex items-center justify-end p-3 space-x-3">
                        <Button variant="text" onClick={() => setOpen(false)}>
                          닫기
                        </Button>
                        <Button variant="contained" color="primary" onClick={updateValue}>
                          업데이트
                        </Button>
                      </div>
                    </div>
                  </RangeShortcutsPanel>
                </>
              ),
            }}
            PopperProps={{
              placement: 'bottom-start',
              sx: { marginTop: '5px !important' },
              open: open,
            }}
            PaperProps={{ sx: { display: 'flex', flexDirection: 'row' } }}
            componentsProps={{ paperContent: { setValue, updateValue } }}
            // TransitionComponent={(props) => (
            //   <>
            //     <Backdrop
            //       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            //       open={open}
            //       onClick={() => setOpen(false)}
            //     >
            //       {props.children}
            //     </Backdrop>
            //   </>
            // )}
          />
        </Stack>
      </LocalizationProvider>
    </>
  )
}
