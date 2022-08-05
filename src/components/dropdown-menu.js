import { useState } from 'react'

import IconVerticalEllipsis from '../icons/icon-vertical-ellipsis'

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='dropdown-menu'>
      <button
        className=''
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}>
        <span aria-hidden="true">
          <IconVerticalEllipsis />
        </span>
      </button>

      <div role="menu" hidden={!open}>
        {children}
      </div>
    </div>
  )
}

function DropdownMenuItem({ label, ...props }) {
  return (
    <button role="menuitem" {...props}>
      {label}
    </button>
  )
}

export { DropdownMenu, DropdownMenuItem }
