import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import { CheckIcon } from '@heroicons/react/24/outline'
import { styled } from '@mui/system'
import { grey, red } from '@mui/material/colors'

export const RoundedToggle = styled(ToggleButton)(() => ({
  height: '2rem',
  borderRadius: '2rem',
  backgroundColor: grey[100],
  ':hover': {
    backgroundColor: grey[100],
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: grey[700],
  },
}))

export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false)

  return (
    <RoundedToggle
      value="check"
      sx={{}}
      selected={selected}
      onChange={() => {
        setSelected(!selected)
      }}
    >
      <p>Unread</p>
    </RoundedToggle>
  )
}
