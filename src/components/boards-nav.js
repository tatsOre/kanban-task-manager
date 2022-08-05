import { useState } from 'react'
import IconBoard from '../icons/icon-board'

import ThemeToggle from '../components/theme-toggle'
import IconChevron from '../icons/icon-chevron'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NavHeading = ({ boards }) => (
  <h2 className="heading-s">ALL BOARDS ({boards || 0})</h2>
)

const BoardsNavigation = ({ boards }) => {
  let location = useLocation()

  return (
    <>
      <NavHeading boards={boards.length} />

      {boards.length ? (
        <ul className="boards-tabs">
          {boards.map((board) => (
            <li>
              <NavLink
                to={`${board.id}`}
                className={({ isActive }) =>
                  isActive ? 'active heading-m' : 'heading-m' // TODO: Fix when modal is open
                }>
                <IconBoard />{board.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}

      <Link to="/boards/new" state={{ backgroundLocation: location }}>
        + Create New Board
      </Link>
    </>
  )
}

BoardsNavigation.defaultProps = {
  boards: []
}

function BoardsMobileNav({ boards }) {
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
        <BoardsNavigation boards={boards} />
        <ThemeToggle />
      </div>
    </div>
  )
}

function BoardsAsideNav({ boards }) {
  return (
    <>
      <BoardsNavigation boards={boards} />
      <ThemeToggle />
    </>
  )
}

export { BoardsAsideNav, BoardsMobileNav }
