import { NavLink } from 'react-router-dom'
import Icon from '../icon/Icon'
import { LinkAppearances } from '../shared/types/appearance'
import { cx } from '../utils'
import './styles.scss'

function StyledNavLink(props) {
  const {
    appearance,
    className,
    children,
    disabled,
    iconStart,
    iconEnd,
    isProcessing,
    openInNewTab,
    showIsActive,
    state,
    to,
    ...other
  } = props

  const linkClassName = cx([
    className,
    appearance,
    (disabled || isProcessing) && 'disabled'
  ])

  const getLinkContent = () => {
    return iconStart || iconEnd ? (
      <>
        {iconStart && <Icon name={iconStart} className="start" />}
        {children && <span>{children}</span>}
        {iconEnd && <Icon name={iconEnd} className="end" />}
      </>
    ) : (
      <span>{children}</span>
    )
  }

  return (
    <NavLink
      className={({ isActive }) =>
        isActive && showIsActive ? cx([linkClassName, 'active']) : linkClassName
      }
      state={state}
      to={to || '#'}
      disabled={disabled || isProcessing}
      {...other}>
      {getLinkContent()}
    </NavLink>
  )
}

export function PrimaryButtonLink({ className, ...props }) {
  return (
    <StyledNavLink
      appearance={LinkAppearances.Primary}
      className={cx([className, 'button-link'])}
      data-testid="primary-button-link"
      {...props}
    />
  )
}

export function StandardButtonLink({ className, ...props }) {
  return (
    <StyledNavLink
      appearance={LinkAppearances.Standard}
      className={cx([className, 'button-link'])}
      data-testid="standard-button-link"
      {...props}
    />
  )
}

export function PrimaryTabLink({ className, ...props }) {
  return (
    <StyledNavLink
      appearance={LinkAppearances.Primary}
      className={cx([className, 'tab-link'])}
      data-testid="primary-tab-link"
      {...props}
    />
  )
}

export function StandardTabLink({ className, ...props }) {
  return (
    <StyledNavLink
      appearance={LinkAppearances.Standard}
      className={cx([className, 'tab-link'])}
      data-testid="standard-tab-link"
      {...props}
    />
  )
}

export default StyledNavLink
