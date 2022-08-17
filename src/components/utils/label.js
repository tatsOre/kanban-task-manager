import { cx } from '.'

/**
 * @desc                           Use with InputText Component or Textarea Component
 * @param     props:
 *            appearance  String
 *            hidden      Boolean  Defaults to 'true'. Set to 'false' to visibly hide the inputs's label
 *            id          String   Specifies the id of the form element the label should be bound to
 *            label       String   Label text
 *            required    Boolean
 *
 * @returns               HTML Label Element
 */
function renderLabel(props) {
  const { appearance, hidden, id, label, required } = props

  const labelClassName = cx([hidden ? 'visually-hidden' : appearance])

  return (
    <label htmlFor={id} className={labelClassName} data-id="textInput-label">
      {label}
      {required ? <span>*</span> : null}
    </label>
  )
}

export default renderLabel
