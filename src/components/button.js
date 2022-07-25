import IconCross from './icons/icon-cross'

function Button({ children, style, size, variant, ...props }) {
  return (
    <button
      className={`button ${variant} ${size}`}
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

function AddTaskButton(props) {
  return (
    <Button id="add-task-button" type="button" {...props}>
      + <span>Add New Task</span>
    </Button>
  )
}

export { AddTaskButton, Button, CloseButton }
