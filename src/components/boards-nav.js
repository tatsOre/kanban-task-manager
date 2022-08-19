import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import IconChevron from '../icons/icon-chevron'
import ThemeToggle from './themeToggle'
import { PrimaryTabLink, StandardTabLink } from './link/StyledLink'
import { HeadingS } from './heading'

const BoardsNavigation = () => {
  const [state] = useAppData()

  const location = useLocation()

  const boards = state && state.USER_BOARDS

  return (
    <>
      <HeadingS tag="h2">ALL BOARDS ({boards.length})</HeadingS>

      <ul className="boards-tabs">
        {boards.length
          ? boards.map((board) => (
              <li key={`board-${board.id}-link`}>
                <PrimaryTabLink
                  iconStart="board"
                  showIsActive={true}
                  to={`${board.id}`}>
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
        state={{ backgroundLocation: location }}>
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

export { BoardsAsideNav, BoardsMobileNav }
