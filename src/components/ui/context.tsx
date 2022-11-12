// @ts-nocheck
import { createTheme, ThemeProvider } from '@mui/material'
import React, { FC, ReactNode, useCallback, useMemo, useReducer } from 'react'
import AlertDialog from './modal/AlertDialog'
import ConfirmDialog from './modal/ConfirmDialog'
import ModalLayout from './modal/ModalLayout'
import SidebarLayout from './sidebar/SidebarLayout'

export interface State {
  displaySidebar: boolean
  displayModal: boolean
  displayCloseConfirm: boolean
  componentSidebar: string
  componentModal: []
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  displayCloseConfirm: false,
  componentSidebar: '',
  componentModal: [],
}

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: any) {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
        componentModal: state.componentModal.slice(0, -1),
      }
    }
    case 'CLEAR_MODAL': {
      return {
        ...state,
        displayModal: false,
        componentModal: [],
      }
    }
    case 'SET_MODAL_COMPONENT': {
      return {
        ...state,
        componentModal: [
          {
            content: action.component,
            options: action.options,
          },
        ],
      }
    }
    case 'ENQUEUE_MODAL_COMPONENT': {
      return {
        ...state,
        componentModal: [
          ...state.componentModal,
          {
            content: action.component,
            options: action.options,
          },
        ],
      }
    }
    case 'OPEN_CLOSE_CONFIRM': {
      return {
        ...state,
        displayCloseConfirm: true,
      }
    }
    case 'CLOSE_CLOSE_CONFIRM': {
      return {
        ...state,
        displayCloseConfirm: false,
      }
    }
    case 'SET_CLOSE_CONFIRM': {
      return {
        ...state,
        displayCloseConfirm: action.open,
      }
    }
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'SET_SIDEBAR_COMPONENT': {
      return {
        ...state,
        componentSidebar: action.component,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  // const [state, dispatch] = React.useReducer(uiReducer, initialState)
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openSidebar = useCallback(
    (component) => {
      dispatch({ type: 'SET_SIDEBAR_COMPONENT', component })
      dispatch({ type: 'OPEN_SIDEBAR' })
    },
    [dispatch]
  )
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch])

  const openModal = useCallback(
    (component, options) => {
      dispatch({ type: 'SET_MODAL_COMPONENT', component, options })
      dispatch({ type: 'OPEN_MODAL' })
    },
    [dispatch]
  )

  const enqueueModal = useCallback(
    (component, options) => {
      dispatch({ type: 'ENQUEUE_MODAL_COMPONENT', component, options })
      dispatch({ type: 'OPEN_MODAL' })
    },
    [dispatch]
  )

  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch])
  const clearModal = useCallback(() => dispatch({ type: 'CLEAR_MODAL' }), [dispatch])

  const openConfirm = useCallback(
    (title, options) => {
      const component = <ConfirmDialog title={title} {...options} />
      dispatch({ type: 'ENQUEUE_MODAL_COMPONENT', component })
      dispatch({ type: 'OPEN_MODAL' })
    },
    [dispatch]
  )

  const openAlert = useCallback(
    (title, options) => {
      const component = <AlertDialog title={title} {...options} />
      dispatch({ type: 'ENQUEUE_MODAL_COMPONENT', component, options: options })
      dispatch({ type: 'OPEN_MODAL' })
    },
    [dispatch]
  )

  const openCloseConfirm = useCallback(() => dispatch({ type: 'OPEN_CLOSE_CONFIRM' }), [dispatch])
  const closeCloseConfirm = useCallback(() => dispatch({ type: 'CLOSE_CLOSE_CONFIRM' }), [dispatch])
  const setCloseConfirm = useCallback((open) => dispatch({ type: 'SET_CLOSE_CONFIRM', open }), [dispatch])

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      openAlert,
      openConfirm,
      openModal,
      enqueueModal,
      closeModal,
      clearModal,
      openCloseConfirm,
      closeCloseConfirm,
      setCloseConfirm,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#152148',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'extra-small' },
          style: {
            height: 26,
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        // fullWidth: true,
        // sx: { mb: 2 },
      },
      styleOverrides: {
        root: {
          '& label': {
            // set some styles for the label if need it
          },
          '& legend': {
            // set some styles for the legend if need it
          },
          '& input': {
            // padding: '6px 12px',
          },
          // '& input:focus': {
          //   border: 'none',
          //   outline: 'none',
          //   boxShadow: 'none',
          // },

          '& .MuiInputBase-root': {
            '&.Mui-focused input': {
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            },
            '& fieldset': {
              // borderColor: 'red',
            },
            '&:hover fieldset': {
              // borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              // border: '1px solid #bbb',
            },
          },
        },
      },
    },
  },
})

export const ManagedUIContext: FC = ({ children }: { children: ReactNode }) => (
  // @ts-ignore
  <ThemeProvider theme={theme}>
    <UIProvider>
      {children}

      <ModalLayout />
      <SidebarLayout />
      <div id="root-modal"></div>
    </UIProvider>
  </ThemeProvider>
)
