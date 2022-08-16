import { cx } from '../utils'
import IconCross from '../../icons/icon-cross'
import './styles.scss'

export const ButtonAppearances = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
  Success: 'success',
  Standard: 'standard'
}

export const ButtonSize = {
  Small: 'small',
  Large: 'large'
}

const IconStyles = {
  close: IconCross
}

const IconComponent = ({ name, ...props }) => {
  const Icon = IconStyles[name]
  return <Icon {...props} />
}

/**
 *
 * @param ariaHaspopup  Boolean    If the button triggers new content to appear (e.g.: modals and dropdowns)
 * @param ariaLabel     String     If the button does not contain text children. (e.g.: icon buttons)
 * @param children      React.ReactNode | string
 * @param disabled      Boolean    If the button is enabled
 * @param iconStart     String     Icon before the button text
 * @param iconEnd       String     Icon after the button text
 * @param isProcessing  Boolean    Is the action intended to be finished or not
 * @param onFocus       Function   Method triggered when button gets focus
 * @param onClick       Function   Method triggered when button is clicked
 * @param type          String     "button" | "reset" | "submit" HTML attribute
 * @returns             React Component
 */

function ButtonBase(props) {
  const {
    appearance,
    children,
    className,
    disabled,
    isProcessing,
    iconStart,
    iconEnd,
    onClick,
    size = iconStart && !children ? undefined : 'small',
    type = 'button',
    ...other
  } = props

  const buttonClassname = cx([
    'button',
    appearance,
    className,
    size,
    (disabled || isProcessing) && 'disabled'
  ])

  const getButtonContent = () => {
    return iconStart || iconEnd ? (
      <>
        {iconStart && <IconComponent name={iconStart} />}
        {children && <span>{children}</span>}
        {iconEnd && <IconComponent name={iconEnd} />}
      </>
    ) : (
      <span>{children}</span>
    )
  }

  return (
    <button
      className={buttonClassname}
      disabled={disabled || isProcessing}
      type={type}
      onClick={onClick}
      {...other}>
      {getButtonContent()}
    </button>
  )
}

export function PrimaryButton({ children, ...props }) {
  return (
    <ButtonBase
      appearance={ButtonAppearances.Primary}
      data-testid="primary-btn"
      {...props}>
      {children}
    </ButtonBase>
  )
}

export function SecondaryButton({ children, ...props }) {
  return (
    <ButtonBase
      appearance={ButtonAppearances.Secondary}
      data-testid="secondary-btn"
      {...props}>
      {children}
    </ButtonBase>
  )
}

export function DangerButton({ children, ...props }) {
  return (
    <ButtonBase
      appearance={ButtonAppearances.Danger}
      data-testid="danger-btn"
      {...props}>
      {children}
    </ButtonBase>
  )
}

export function StandardButton({ children, ...props }) {
  return (
    <ButtonBase
      appearance={ButtonAppearances.Standard}
      data-testid="standard-btn"
      {...props}>
      {children}
    </ButtonBase>
  )
}

export default ButtonBase
