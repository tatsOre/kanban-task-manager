import PropTypes from 'prop-types'
import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import './styles.scss'

/**
 * Alternative version using `appearance` CSS property
 * https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
 * @returns   React Component
 */

function ToggleInput(props) {
  const {
    checked,
    disabled,
    id,
    inputLabel,
    onChange,
    onClick,
    showInputLabel,
    value
  } = props

  const appearance = disabled ? 'disabled' : props.appearance

  return (
    <div className={cx(['toggle-wrapper', props.className, appearance])}>
      <input
        aria-checked={checked}
        className={cx(['toggle-input', appearance])}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        data-testid="toggle-input"
        value={value}
      />

      <label
        htmlFor={id}
        className={cx([
          showInputLabel ? 'toggle-label' : 'visually-hidden',
          appearance
        ])}>
        <span>{inputLabel}</span>
      </label>

      {props.hintContent ? <small>{props.hintContent}</small> : null}
    </div>
  )
}

ToggleInput.propTypes = {
  /**
   * Sets the style of the component. Defaults to `standard`, but supports `error` and `success`.
   */
  appearance: PropTypes.string,
  /**
   * Whether or not the Toggle Input is checked
   */
  checked: PropTypes.bool,
  /**
   * Custom `class` for the input wrapper
   */
  className: PropTypes.string,
  /**
   * The text that appears next to the input. Should always be set even when hidden for accessibility support.
   */
  inputLabel: PropTypes.string.isRequired,
  /**
   * Defaults to true, but set to `false` to visibly hide the content passed to `inputLabel`.
   */
  showInputLabel: PropTypes.bool,
  /**
   * Extra indication or suggestion about the input
   */
  hintContent: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Optional change handler
   */
  onChange: PropTypes.func,
  /**
   * The input value
   */
  value: PropTypes.string
}

ToggleInput.defaultProps = {
  appearance: InputAppearances.Standard,
  showInputLabel: true
}

export default ToggleInput
