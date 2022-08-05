import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import useUser from '../hooks/use-user'
import { BoardsAsideNav, BoardsMobileNav } from './boards-nav'
import { AddButton, Button } from './button'
import { DropdownMenu, DropdownMenuItem } from './dropdown-menu'
import Logo from './logotype'

import { IconHideSidebar, IconShowSidebar } from '../icons/icon-sidebar'

function BoardsManager() {
  const [openSidebar, setShowSidebar] = useState(true)

  const [state] = useAppData()

  const user = useUser()

  const userBoards = user.boards

  const handleOpenSidebar = () => setShowSidebar(true)

  return (
    <div data-theme={state.THEME} className="dashboard-container">
      <header className="dashboard-header mobile">
        <Logo size="sm" />

        <BoardsMobileNav boards={userBoards} />

        <AddButton className="create-task" />

        <DropdownMenu>
          <DropdownMenuItem label="Edit Task" />
          <DropdownMenuItem label="Delete Task" />
        </DropdownMenu>
      </header>

      <header className="dashboard-header">
        <Logo />
      </header>

      <aside className="dashboard-sidebar">
        <div className="boards-menu">
          <BoardsAsideNav boards={userBoards} />

          <button onClick={() => {}}>
            <IconHideSidebar /> Hide Sidebar
          </button>
        </div>
      </aside>

      <Button className="show-sidebar__btn" onClick={() => {}}>
        <IconShowSidebar />
      </Button>

      {!userBoards.length && <section>hey, no boards, create one</section>}
      <Outlet />
    </div>
  )
}

export default BoardsManager
