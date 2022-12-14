import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { RoundedToggle } from './ToggleButton'
import { TrophyIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid'
import { blue } from '@mui/material/colors'
import { Button } from '@mui/material'
import { ArrowUpRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    borderRadius: '2rem',
    '&:not(:first-of-type)': {
      borderRadius: '2rem',
    },
    '&:first-of-type': {
      borderRadius: '2rem',
    },
  },
}))

export default function CustomizedDividers() {
  const [alignment, setAlignment] = React.useState('trophy')
  const [formats, setFormats] = React.useState(() => ['italic'])

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats)
  }

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment == null) return

    setAlignment(newAlignment)
  }

  console.debug(alignment)

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <div className="flex flex-col">
          <StyledToggleButtonGroup
            size="small"
            className="space-x-1"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <RoundedToggle
              value="trophy"
              aria-label="trophy"
              sx={{
                height: '1.75rem',
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: blue[800],
                  backgroundColor: blue[100],
                },
              }}
            >
              <div className="flex items-center">
                <TrophyIcon className="w-4 h-4 mr-1" />
                <p>?????? ??????</p>
              </div>
            </RoundedToggle>
            <RoundedToggle
              value="users"
              aria-label="users"
              sx={{
                height: '1.75rem',
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: blue[800],
                  backgroundColor: blue[100],
                },
              }}
            >
              <div className="flex items-center">
                <UsersIcon className="w-4 h-4 mr-1" />
                <p>???</p>
              </div>
            </RoundedToggle>
            <RoundedToggle
              value="usergroup"
              aria-label="usergroup"
              sx={{
                height: '1.75rem',
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: blue[800],
                  backgroundColor: blue[100],
                },
              }}
            >
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-1" />
                <p>?????? ?????????</p>
              </div>
            </RoundedToggle>
          </StyledToggleButtonGroup>

          {alignment == 'trophy' && (
            <div className="flex items-center h-48 p-4 m-1 mt-4 border">
              <div className="mr-10">
                <img src="https://jira-frontend-static.prod.public.atl-paas.net/assets/MeepleOrgChart.9f065b9c4a443484114a4fa32e0ff83d.8.svg" />
              </div>

              <div className="max-w-sm space-y-3">
                <p className="text-xl font-bold">????????? ??? ?????? ?????? ??????</p>
                <div className="flex items-center">
                  <GlobeAltIcon className="w-4 h-4 mr-1 text-blue-600" />
                  <p className="text-xs text-gray-400 hover:text-gray-500">Atlas ??????</p>
                </div>
                <p className="text-sm">
                  ID ???????????? ????????? ????????? ???????????? ???????????? ????????? ??? ?????? ????????? ????????? ???????????????
                </p>
                <Button
                  className="text-black bg-gray-100 shadow-none hover:bg-gray-200 hover:shadow-none"
                  variant="contained"
                  size="small"
                  endIcon={
                    <>
                      <ArrowUpRightIcon className="w-3 h-3 stroke-2" />
                    </>
                  }
                >
                  <p>?????? ??????</p>
                </Button>
              </div>
            </div>
          )}

          {alignment == 'users' && (
            <div className="flex items-center h-48 p-4 m-1 mt-4 border">
              <div className="mr-10">
                <img src="https://jira-frontend-static.prod.public.atl-paas.net/assets/MeepleStack.7dc9b69dded79bfbcecaf1aae272133c.8.svg" />
              </div>

              <div className="max-w-sm space-y-3">
                <p className="text-xl font-bold">??? ??????</p>
                <p className="text-sm">
                  ?????? ????????? ????????? @????????????, ?????? ??????????????? ????????????, ?????? ?????? ?????? ????????? ???????????? ??? ???????????? ???
                  ??????????????? ????????? ??? ????????????
                </p>
                <Button
                  className="text-black bg-gray-100 shadow-none hover:bg-gray-200 hover:shadow-none"
                  variant="contained"
                  size="small"
                >
                  <p>??? ?????????</p>
                </Button>
              </div>
            </div>
          )}

          {alignment == 'usergroup' && (
            <div className="flex items-center h-48 p-4 m-1 mt-4 border">
              <div className="flex items-center mr-10 -space-x-3">
                <img
                  width="78px"
                  height="78px"
                  src="https://jira-frontend-static.prod.public.atl-paas.net/assets/Oliver.7c2bb66f3ace7dd9e154be41d6eb0526.8.svg"
                />

                <img
                  width="78px"
                  height="78px"
                  src="https://jira-frontend-static.prod.public.atl-paas.net/assets/Effie.c04597b4f4301f74c30f2c5c574bbf92.8.svg"
                />
              </div>

              <div className="max-w-sm space-y-3">
                <p className="text-xl font-bold">????????? ??? ??? ?????? ???????????? ????????????</p>
                <p className="text-sm">?????? 90??? ?????? ?????? ????????? ???????????? ????????? ???????????????.</p>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  )
}
