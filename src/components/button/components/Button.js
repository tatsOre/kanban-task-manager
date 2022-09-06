import PropTypes from 'prop-types'
import { cx } from '../../utils'
import { ButtonAppearances } from '../../shared/types/appearance'
import Icon from '../../icon/Icon'
import '../styles/button.scss'

/**
 * This component accepts all the HTML Button attributes
 * @returns   React Component
 */

function ButtonBase(props) {
  const {
    appearance,
    ariaHaspopup,
    ariaLabel,
    children,
    className,
    disabled,
    isProcessing,
    iconStart,
    iconEnd,
    onClick,
    size,
    type,
    ...other
  } = props

  const buttonClassname = cx([
    'button',
    `button--${appearance}`,
    `button--${size}`,
    className,
    (disabled || isProcessing) && 'disabled'
  ])

  const getButtonContent = () => {
    return iconStart || iconEnd ? (
      <>
        {iconStart && (
          <Icon name={iconStart} className={cx([children && 'start'])} />
        )}
        {children && <span>{children}</span>}
        {iconEnd && <Icon name={iconEnd} className={cx([children && 'end'])} />}
      </>
    ) : (
      <span>{children}</span>
    )
  }

  return (
    <button
      aria-haspopup={ariaHaspopup}
      aria-label={ariaLabel}
      className={buttonClassname}
      disabled={disabled || isProcessing}
      type={type}
      onClick={onClick}
      {...other}>
      {getButtonContent()}
    </button>
  )
}

ButtonBase.propTypes = {
  /**
   * If the button triggers new content to appear (e.g.: modals and dropdowns)
   */
  ariaHaspopup: PropTypes.bool,
  /**
   * If the button does not contain text children. (e.g.: icon buttons)
   */
  ariaLabel: PropTypes.string,
  /**
   * Is the button is enabled?
   */
  disabled: PropTypes.bool,
  /**
   * Icon before the button text
   */
  iconStart: PropTypes.string,
  /**
   * Icon after the button text
   */
  iconEnd: PropTypes.string,
  /**
   * Is the action intended to be finished or not?
   */
  isProcessing: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * Button text content
   */
  children: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Optional focus handler
   */
  onFocus: PropTypes.func,
  /**
   * HTML attribute
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

ButtonBase.defaultProps = {
  type: 'button',
  size: 'small'
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
