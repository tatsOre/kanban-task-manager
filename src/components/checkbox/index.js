import { InputAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import './styles.scss'

// Memo:
function CheckboxInput(props) {
  const containerProps = {
    className: cx(['checkbox-wrapper', props.className])
  }
  const appearance = props.disabled ? 'disabled' : props.appearance

  const getCheckboxProps = () => {
    const {
      appearance,
      className,
      errors,
      inputLabel,
      hintContent,
      showInputLabel,
      showCheckedLabel,
      ...otherProps
    } = props
    return { ...otherProps }
  }

  return (
    <div {...containerProps}>
      <label
        className={cx([
          props.checked && props.showCheckedLabel && 'label-checked',
          appearance
        ])}>
        <input
          className="visually-hidden"
          type="checkbox"
          {...getCheckboxProps()}
        />
        <span
          className={cx([
            'checkmark',
            appearance,
            props.checked && 'checkbox-active'
          ])}
          aria-hidden="true"></span>
        <span className={cx([!props.showInputLabel && 'visually-hidden'])}>
          {props.inputLabel}
        </span>
      </label>
      {props.hintContent ? <small>{props.hintContent}</small> : null}
      {props.errors ? <strong>{props.errors}</strong> : null}
    </div>
  )
}

CheckboxInput.defaultProps = {
  appearance: InputAppearances.Standard,
  showInputLabel: true,
  showCheckedLabel: true
}

export default CheckboxInput
