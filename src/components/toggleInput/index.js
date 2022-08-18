import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import './styles.scss'

function ToggleInput(props) {
  const {
    appearance,
    checked,
    colAlign,
    disabled,
    inputLabel,
    onChange,
    onClick,
    showInputLabel,
    value
  } = props

  const inputClassName = cx([
    'toggle-input',
    disabled ? 'disabled' : appearance
  ])

  return (
    <label>
      <div className={cx(['toggle-container', colAlign && 'col-align'])}>
        <div className="toggle-box">
          <input
            className={inputClassName}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onClick={onClick}
            data-testid="toggle-input"
            value={value}
          />
          <span className="toggle-slider"></span>
        </div>
        <div
          className={cx([showInputLabel ? 'toggle-label' : 'visually-hidden'])}>
          {inputLabel}
        </div>
      </div>
    </label>
  )
}

ToggleInput.defaultProps = {
  appearance: InputAppearances.Standard,
  showInputLabel: true
}

export default ToggleInput
