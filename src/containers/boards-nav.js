import { useLocation } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { StandardButton } from '../components/button'
import { HeadingS } from '../components/heading'
import { PrimaryTabLink, StandardTabLink } from '../components/link/StyledLink'
import ThemeToggle from '../components/themeToggle'
import useClickOutside from '../hooks/use-click-outside'
import { useRef } from 'react'

export const BoardsNavigation = (props) => {
  const [state, dispatch] = useAppData()

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
                  to={`${props.completePath ? '/boards/' : ''}${board.id}`}
                  onClick={() =>
                    dispatch({ type: 'OPEN_POP_MENU', payload: false })
                  }>
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
        style={{ marginBottom: '0.5rem' }}
        onClick={() => dispatch({ type: 'OPEN_POP_MENU', payload: false })}>
        + Create New Board
      </StandardTabLink>
    </>
  )
}

function BoardsMobileNav() {
  const [state, dispatch] = useAppData()
  const me = useRef()

  const closePopMenu = () => dispatch({ type: 'OPEN_POP_MENU', payload: false })

  useClickOutside(me, closePopMenu)

  return (
    <>
      <div
        ref={me}
        className={`boards-menu mobile ${
          state.OPEN_POP_MENU ? 'expanded' : 'hidden'
        }`}>
        <StandardButton
          iconStart="chevron"
          aria-haspopup="true"
          aria-expanded={state.OPEN_POP_MENU}
          style={{ paddingInline: '0.75rem' }}
          onClick={() =>
            dispatch({ type: 'OPEN_POP_MENU', payload: !state.OPEN_POP_MENU })
          }
        />

        <div role="menu">
          <HeadingS tag="h2">ALL BOARDS ({state.USER_BOARDS.length})</HeadingS>
          <BoardsNavigation completePath />
          <ThemeToggle />
        </div>
      </div>

      {state.OPEN_POP_MENU && <div className="mobilenav-backdrop"></div>}
    </>
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
