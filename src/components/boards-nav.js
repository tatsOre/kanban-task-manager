import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import { useAppData } from '../context/app-data'
import IconBoard from '../icons/icon-board'
import IconChevron from '../icons/icon-chevron'
import ThemeToggle from '../components/theme-toggle'

const NavHeading = ({ boards }) => (
  <h2 className="heading-s">ALL BOARDS ({boards || 0})</h2>
)

const BoardsNavigation = () => {
  const [state] = useAppData()

  const location = useLocation()

  const boards = state && state.USER_BOARDS

  return (
    <>
      <NavHeading boards={boards.length} />

      <ul className="boards-tabs">
        {boards.length
          ? boards.map((board) => (
              <li key={`board-${board.id}-link`}>
                <NavLink
                  to={`${board.id}`}
                  className={({ isActive }) =>
                    isActive ? 'active heading-m' : 'heading-m'
                  }>
                  <IconBoard />
                  {board.name}
                </NavLink>
              </li>
            ))
          : null}

        <li>
          <Link
            to="/boards/new"
            state={{ backgroundLocation: location }}
            className="new-board heading-m">
            <IconBoard />+ Create New Board
          </Link>
        </li>
      </ul>
    </>
  )
}

function BoardsMobileNav() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className={`boards-menu mobile ${openMenu ? 'expanded' : 'hidden'}`}>
      <button
        aria-haspopup="true"
        aria-expanded={openMenu}
        onClick={() => setOpenMenu(!openMenu)}>
        <span className="icon-chevron" aria-hidden="true">
          <IconChevron />
        </span>
      </button>

      <div role="menu">
        <BoardsNavigation />
        <ThemeToggle />
      </div>
    </div>
  )
}

function BoardsAsideNav() {
  return (
    <>
      <BoardsNavigation />
      <ThemeToggle />
    </>
  )
}

function TaskMenu({ board, task, onClick }) {
  return (
    <Menu>
      <MenuButton>...</MenuButton>
      <MenuList>
        <Link
          to={`/boards/${board}/${task.id}/edit`}
          state={{ backgroundLocation: `/boards/${board}` }}>
          <MenuItem>Edit</MenuItem>
        </Link>

        <MenuItem onSelect={onClick}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}

export { BoardsAsideNav, BoardsMobileNav, TaskMenu }
