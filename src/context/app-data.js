import { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  THEME: 'light',
  ACTIVE_BOARD: null,
  ACTIVE_TASK: null
}

function useAppData() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext should be used within a AppContext')
  }
  return context
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TASK':
      console.log('Setting active task')
      return {
        ...state,
        ACTIVE_TASK: action.payload
      }
    case 'SET_ACTIVE_BOARD':
      
      return {
        ...state,
        ACTIVE_BOARD: action.payload
      }
    case 'SET_THEME':
      return {
        ...state,
        THEME: action.payload
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
