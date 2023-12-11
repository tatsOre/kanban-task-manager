import PropTypes from 'prop-types'
import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import renderLabel from '../utils/label'
import './styles.scss'

/**
 * This component accepts all the HTML Textarea attributes
 * @returns   React Component
 */

function Textarea(props) {
  const {
    appearance,
    className,
    errors,
    id,
    inputLabel,
    hintContent,
    showInputLabel,
    ...other
  } = props

  return (
    <div className={cx([className, 'textarea-wrapper'])}>
      {renderLabel({
        appearance: props.disabled ? '--disabled' : appearance,
        hidden: !showInputLabel,
        id,
        label: inputLabel,
        required: props.required
      })}

      <textarea
        aria-invalid={appearance === 'error'}
        className={cx([props.disabled ? '--disabled' : appearance])}
        id={id}
        {...other}></textarea>

      {errors ? <strong>{props.errors}</strong> : null}
      {hintContent ? <small>{props.hintContent}</small> : null}
    </div>
  )
}

Textarea.propTypes = {
  /**
   * Sets the style of the component. Defaults to `standard`, but supports `error` and `success`.
   */
  appearance: PropTypes.string,
  /**
   * Custom `class` for the input wrapper
   */
  className: PropTypes.string,
  /**
   * Sets the contents for validation errors and will be displayed below the input element.
   */
  errors: PropTypes.string,
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
   * Optional change handler
   */
  onChange: PropTypes.func,
  /**
   * The input value
   */
  value: PropTypes.string
}

Textarea.defaultProps = {
  appearance: InputAppearances.Standard,
  rows: 4,
  showInputLabel: true
}

export default Textarea
