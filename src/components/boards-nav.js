import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import ThemeToggle from './themeToggle'
import { PrimaryTabLink, StandardTabLink } from './link/StyledLink'
import { HeadingS } from './heading'

export const BoardsNavigation = (props) => {
  const [state] = useAppData()

  const location = useLocation()

  const boards = state && state.USER_BOARDS

  return (
    <>
      <ul className="boards-tabs">
        {boards.length
          ? boards.map((board) => (
              <li key={`board-${board.id}-link`}>
                <PrimaryTabLink
                  iconStart="board"
                  showIsActive={true}
                  to={`${props.completePath ? '/boards/' : ''}${board.id}`}>
                  {board.name}
                </PrimaryTabLink>
              </li>
            ))
          : null}
      </ul>

      <StandardTabLink
        iconStart="board"
        className="new-board"
        to="/boards/new"
        state={{ backgroundLocation: location }}
        style={{ marginBottom: '0.5rem'}}>
        + Create New Board
      </StandardTabLink>
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
          M
        </span>
      </button>

      <div role="menu">
        <a href='www.google.com' target="blank">Google</a>
        <BoardsNavigation completePath />
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

export { BoardsAsideNav, BoardsMobileNav }
