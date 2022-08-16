import React from 'react'
import AddIcon from '../icons/icon-add-plus'
import IconCross from '../icons/icon-cross'
import { IconHideSidebar, IconShowSidebar } from '../icons/icon-sidebar'

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
  variant: 'primary',
  className: ''
}

function CloseButton(props) {
  return (
    <button className="close-button" type="button" {...props}>
      <IconCross />
    </button>
  )
}



function SidebarToggle({ openSidebar, onClick }) {
  return (
    <button
      className={`${openSidebar ? 'hide' : 'show'} toggle-sidebar heading-m`}
      onClick={onClick}>
      {openSidebar ? (
        <>
          <IconHideSidebar /> Hide Sidebar
        </>
      ) : (
        <IconShowSidebar />
      )}
    </button>
  )
}

export {  Button, CloseButton, SidebarToggle }
