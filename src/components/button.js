import AddIcon from '../icons/icon-add-plus'
import IconCross from '../icons/icon-cross'

function Button({ className, children, style, size, variant, ...props }) {
  return (
    <button
      className={`button ${variant} ${size} ${className}`}
      style={{ ...style }}
      {...props}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  size: 'small',
  variant: 'primary'
}

function CloseButton(props) {
  return (
    <button className="close-button" type="button" {...props}>
      <IconCross />
    </button>
  )
}

function AddButton({ className, ...props }) {
  return (
    <button
      className={`plus-button primary ${className}`}
      type="button"
      {...props}>
      <AddIcon />
    </button>
  )
}

export { AddButton, Button, CloseButton }
