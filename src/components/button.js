import React from 'react'

import { IconHideSidebar, IconShowSidebar } from '../icons/icon-sidebar'

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

export { SidebarToggle }
