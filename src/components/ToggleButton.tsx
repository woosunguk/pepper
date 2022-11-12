import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import { CheckIcon } from '@heroicons/react/24/outline'
import { styled } from '@mui/system'
import { grey, red } from '@mui/material/colors'

const StandaloneToggleButton2 = styled(ToggleButton)(() => ({
  height: '2rem',
  borderRadius: '1.5rem',
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
    <StandaloneToggleButton2
      value="check"
      sx={{}}
      selected={selected}
      onChange={() => {
        setSelected(!selected)
      }}
    >
      <p>Unread</p>
    </StandaloneToggleButton2>
  )
}
