import PropTypes from 'prop-types'
import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import renderLabel from '../utils/label'
import './styles.scss'

/**
 * This component accepts all the HTML Textarea attributes
 * @returns   React Component
 */

function TextInput(props) {
  const appearance = props.disabled ? '--disabled' : props.appearance

  function getInputElementProps() {
    const {
      appearance,
      className,
      errors,
      hintContent,
      inputLabel,
      showInputLabel,
      ...otherProps
    } = props

    return { ...otherProps }
  }

  function getInputElement({ appearance, isValid }) {
    return (
      <div className="input-wrapper">
        <input
          className={cx([appearance])}
          aria-invalid={isValid}
          {...getInputElementProps()}
        />
        {props.errors ? <strong>{props.errors}</strong> : null}
      </div>
    )
  }

  return (
    <div className={cx([props.className, 'text-input--wrapper'])}>
      {renderLabel({
        appearance,
        hidden: !props.showInputLabel,
        id: props.id,
        label: props.inputLabel,
        required: props.required
      })}
      {getInputElement({
        appearance,
        isValid: appearance === 'error'
      })}

      {props.hintContent ? <small>{props.hintContent}</small> : null}
    </div>
  )
}

TextInput.propTypes = {
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
   * Describes the different types for the HTML `input` element.
   */
  type: PropTypes.oneOf([
    'email',
    'password',
    'number',
    'search',
    'tel',
    'text',
    'url'
  ]),
  /**
   * The input value
   */
  value: PropTypes.string
}

TextInput.defaultProps = {
  appearance: InputAppearances.Standard,
  type: 'text',
  showInputLabel: true
}

export default TextInput
