import { useAppData } from '../../context/app-data'
import ToggleInput from '../toggleInput'
import './styles.scss'

function ThemeToggle() {
  const [state, dispatch] = useAppData()

  const toggleTheme = () =>
    dispatch({
      type: 'SET_THEME',
      payload: state.THEME === 'dark' ? 'light' : 'dark'
    })

  return (
    <div className="theme-toggle">
      <ToggleInput
        checked={state.THEME === 'light'}
        onChange={toggleTheme}
        onClick={toggleTheme}
        inputLabel="Theme Toggle"
        showInputLabel={false}
        value={state.THEME}
      />
    </div>
  )
}

export default ThemeToggle
