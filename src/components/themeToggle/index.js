import { useAppData } from '../../context/app-data'
import ToggleInput from '../toggleInput'
import './styles.scss'

function ThemeToggle(props) {
  const [state, dispatch] = useAppData()

  const toggleTheme = () =>
    dispatch({
      type: 'SET_THEME',
      payload: state.THEME === 'dark' ? 'light' : 'dark'
    })

  return (
    <div className="theme-toggle" {...props}>
      <ToggleInput
        checked={state.THEME === 'dark'}
        id="toggle-theme"
        inputLabel="Theme Toggle"
        onChange={toggleTheme}
        onClick={toggleTheme}
        showInputLabel={false}
        value={state.THEME}
      />
    </div>
  )
}

export default ThemeToggle
