import * as React from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import {
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material'
import { Check } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { BellIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

const emails = ['username@gmail.com', 'user02@gmail.com']

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl)
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl(null)
  }

  const [open3, setOpen3] = React.useState(true)

  const handleClick3 = () => {
    setOpen3(!open3)
  }

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body')

  return (
    <Dialog onClose={handleClose} open={open} scroll={scroll}>
      <DialogTitle>Set backup account</DialogTitle>

      <div>
        <Button
          id="basic-button"
          aria-controls={open2 ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? 'true' : undefined}
          onClick={handleClick2}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open2}
          onClose={handleClose2}
          // MenuListProps={{
          //   'aria-labelledby': 'basic-button',
          // }}
        >
          <Paper sx={{ width: 320 }}>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Nested List Items
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
              <ListItemButton onClick={handleClick3}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <MenuList dense>
              <MenuItem>
                <ListItemText inset>Single</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText inset>1.15</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText inset>Double</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                Custom: 1.2
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText>Add space before paragraph</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Add space after paragraph</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText>Custom spacing...</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
        </Menu>
      </div>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default function Notification2() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl2)
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const [open3, setOpen3] = React.useState(true)

  const handleClick3 = () => {
    setOpen3(!open3)
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BellIcon className="w-4 h-4" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ width: 320 }}>
          <div className="flex items-center justify-end">
            <IconButton
              id="basic-button"
              aria-controls={open2 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open2 ? 'true' : undefined}
              onClick={handleClick2}
            >
              <EllipsisVerticalIcon className="w-4 h-4" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose2}>Profile</MenuItem>
              <MenuItem onClick={handleClose2}>My account</MenuItem>
              <MenuItem onClick={handleClose2}>Logout</MenuItem>
            </Menu>
          </div>

          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick3}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <MenuList dense>
            <MenuItem>
              <ListItemText inset>Single</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>1.15</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>Double</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              Custom: 1.2
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Add space before paragraph</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Add space after paragraph</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Custom spacing...</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </div>
  )
}
