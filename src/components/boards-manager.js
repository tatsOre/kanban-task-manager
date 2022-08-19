import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { BoardsAsideNav } from './boards-nav'


import SidebarToggleButton from './button/SidebarToggleButton'
import Logo from './logotype'

function BoardsManager() {
  const [openSidebar, setShowSidebar] = useState(true)
  const [state] = useAppData()

  const handleToggleSidebar = () => setShowSidebar(!openSidebar)

  return (
    <div
      data-theme={state.THEME}
      data-open-sidebar={openSidebar}
      className="dashboard-container">
      <header className="dashboard-header mobile">
        <Logo size="sm" />
      </header>

      <header className="dashboard-header">
        <Logo />
      </header>

      <aside className="dashboard-sidebar">
        <div className="nav-container">
          <BoardsAsideNav />
        </div>
      </aside>

      <SidebarToggleButton open={openSidebar} onClick={handleToggleSidebar} />
      <Outlet />
    </div>
  )
}

export default BoardsManager
