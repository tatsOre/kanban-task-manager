import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { BoardsNavigation } from '../components/boards-nav'
import { HeadingS } from '../components/heading'
import Logo from '../components/logotype'
import { SidebarToggleButton } from '../components/button'
import ThemeToggle from '../components/themeToggle'

import '../styles/layout.scss'

function BoardsManager() {
  const [openSidebar, setShowSidebar] = useState(true)
  const [state] = useAppData()

  const handleToggleSidebar = () => setShowSidebar(!openSidebar)

  return (
    <div
      data-theme={state.THEME}
      data-open-sidebar={openSidebar}
      className="dashboard__container">
      <header className="dashboard__header mobile">
        <Logo size="sm" />
      </header>

      <header className="dashboard__header">
        <Logo />
      </header>

      <aside className="dashboard__sidebar">
        <div className="sidebar__container">
          <HeadingS tag="h2">ALL BOARDS ({state.USER_BOARDS.length})</HeadingS>
          <BoardsNavigation />
          <ThemeToggle style={{ marginTop: 'auto' }} />
        </div>
      </aside>

      <SidebarToggleButton open={openSidebar} onClick={handleToggleSidebar} />
      <Outlet />
    </div>
  )
}

export default BoardsManager
