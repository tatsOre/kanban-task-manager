import { useAppData } from '../context/app-data'

function Switch(props) {
  const [state, dispatch] = useAppData()

  const toggleTheme = () =>
    dispatch({
      type: 'SET_THEME',
      payload: state.THEME === 'dark' ? 'light' : 'dark'
    })

  return (
    <div className="toggle-container">
      <label className="toggle-box" aria-label="Theme Toggle">
        <input
          className="toggle-input"
          type="checkbox"
          onChange={toggleTheme}
          onClick={toggleTheme}
          data-testid="toggle-input"
        />
        <span className={`toggle-slider ${state.THEME}`} {...props} />
      </label>
    </div>
  )
}

export default Switch
