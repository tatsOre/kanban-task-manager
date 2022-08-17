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
 *
 *                            This component accepts all the HTML Textarea attributes
 *
 * @returns                   React Component
 */

function Textarea(props) {
  const containerProps = {}

  const {
    appearance,
    className,
    errors,
    id,
    inputLabel,
    hintContent,
    showInputLabel,
    value,
    ...other
  } = props

  const inputClassName = props.disabled ? 'disabled' : appearance

  if (props.className) {
    containerProps.className = props.className
  }

  return (
    <div {...containerProps}>
      {renderLabel({
        appearance: inputClassName,
        hidden: !showInputLabel,
        id,
        label: inputLabel,
        required: props.required
      })}

      <textarea
        aria-invalid={appearance === 'error'}
        className={cx([inputClassName])}
        id={id}
        value={value}
        {...other}></textarea>

      {errors ? <strong>{props.errors}</strong> : null}
      {hintContent ? <small>{props.hintContent}</small> : null}
    </div>
  )
}

Textarea.defaultProps = {
  appearance: InputAppearances.Standard,
  rows: 4,
  showInputLabel: true
}

export default Textarea
