import { createContext, useContext, useReducer } from 'react'
import { BOARDS_KEY } from '../utils/constants'

const AppContext = createContext()

const theme = window.localStorage.getItem('theme')
if (!theme) window.localStorage.setItem('theme', 'light')

// set boards data from json sample:
let boards = []

if (window.sessionStorage.getItem(BOARDS_KEY) === null) {
  const data = require('../data/data.json')
  window.sessionStorage.setItem(BOARDS_KEY, JSON.stringify(data.boards))
}

boards = JSON.parse(window.sessionStorage.getItem(BOARDS_KEY))

const initialState = {
  ACTIVE_BOARD: null,
  ACTIVE_TASK: null,
  DELETE_TASK: false,
  DELETE_BOARD: false,
  OPEN_POP_MENU: false,
  USER_BOARDS: boards.map((b) => ({ id: b.id, name: b.name })),
  THEME: theme || 'light'
}

function useAppData() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext should be used within a AppContext')
  }
  return context
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'OPEN_POP_MENU':
      return {
        ...state,
        OPEN_POP_MENU: payload
      }
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        ACTIVE_TASK: payload
      }
    case 'SET_ACTIVE_BOARD':
      return {
        ...state,
        ACTIVE_BOARD: payload
      }
    case 'SET_THEME':
      window.localStorage.setItem('theme', payload)
      return {
        ...state,
        THEME: payload
      }
    case 'OPEN_DELETE_TASK':
      return {
        ...state,
        DELETE_TASK: payload
      }
    case 'OPEN_DELETE_BOARD':
      return {
        ...state,
        DELETE_BOARD: payload
      }
    case 'SET_NEW_BOARD':
      return {
        ...state,
        USER_BOARDS: [...state.USER_BOARDS, payload]
      }
    case 'UPDATE_BOARDS':
      return {
        ...state,
        USER_BOARDS: payload
      }
    case 'RESET_STATE':
      return initialState
    default:
      return
  }
}

function AppDataProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AppContext.Provider value={[state, dispatch]} {...props} />
}

export { useAppData, AppDataProvider }
