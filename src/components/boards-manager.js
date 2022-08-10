import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import useUser from '../hooks/use-user'
import { BoardsAsideNav, BoardsMobileNav } from './boards-nav'
import { AddButton, SidebarToggle } from './button'

import Logo from './logotype'

function BoardsManager() {
  const [openSidebar, setShowSidebar] = useState(true)

  const [state] = useAppData()

  const user = useUser()

  const userBoards = user.boards

  const handleToggleSidebar = () => setShowSidebar(!openSidebar)

  return (
    <div
      data-theme={state.THEME}
      data-open-sidebar={openSidebar}
      className="dashboard-container">
      <header className="dashboard-header mobile">
        <Logo size="sm" />
        <BoardsMobileNav boards={userBoards} />
        <AddButton className="create-task" />
      </header>

      <header className="dashboard-header">
        <Logo />
      </header>

      <aside className="dashboard-sidebar">
        <div className="nav-container">
          <BoardsAsideNav boards={userBoards} />
        </div>
      </aside>
      <SidebarToggle openSidebar={openSidebar} onClick={handleToggleSidebar} />
      <Outlet />
    </div>
  )
}

export default BoardsManager
