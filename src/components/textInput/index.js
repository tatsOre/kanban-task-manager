import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import renderLabel from '../utils/label'
import './styles.scss'

/**
 * @param     props:
 *            appearance      String    This defaults to InputAppearance.Standard. Suports InputAppearance.Error
 *            inputLabel      String    Label element text
 *            showInputLabel  Boolean   Defaults to 'true'. Set to 'false' to visibly hide the inputs's label
 *            errors          String    Sets the contents for validation errors
 *            hintContent     String    Extra indication or suggestion about the input
 *            type            String     HTML attribute:
 *                                       "email" | "password" | "number" | "search" | "tel" | "text" | "url"
 *                            This component accepts all the HTML Input attributes
 *
 * @returns                   React Component
 */

function TextInput(props) {
  const containerProps = {}
  const appearance = props.disabled ? 'disabled' : props.appearance

  if (props.className) {
    containerProps.className = props.className
  }

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
    const { value, ...otherProps } = getInputElementProps()
    const inputClassName = cx([appearance])
    return (
      <div className='input-wrapper'>
        <input
          className={inputClassName}
          aria-invalid={isValid}
          value={value}
          {...otherProps}
        />
        {props.errors ? <strong>{props.errors}</strong> : null}
      </div>
    )
  }

  return (
    <div {...containerProps}>
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

TextInput.defaultProps = {
  appearance: InputAppearances.Standard,
  type: 'text',
  showInputLabel: true
}

export default TextInput
