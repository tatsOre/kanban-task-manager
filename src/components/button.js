import { useTheme } from './context/theme'
import IconCross from './icons/icon-cross'
import './styles/global.css'

function Button({ children, style, size, variant, ...props }) {
  const [theme] = useTheme()

  return (
    <button className={`button ${variant} ${size}`} style={{ ...style }} {...props}>
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
    <button className='close-button' type="button" {...props}>
      <IconCross />
    </button>
  )
}

export { Button, CloseButton }
