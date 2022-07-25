import { useTheme } from '../components/context/theme'

function Switch(props) {
  const [theme, setTheme] = useTheme()

  return (
    <div className="toggle-container">
      <label className="toggle-box" aria-label="Theme Toggle">
        <input
          className="toggle-input"
          type="checkbox"
          onChange={() => {}}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          data-testid="toggle-input"
        />
        <span className={`toggle-slider ${theme}`} {...props} />
      </label>
    </div>
  )
}

export default Switch
