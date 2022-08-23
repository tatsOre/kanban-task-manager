import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { BOARDS_KEY } from '../utils/constants'

import { getCompletedSubtasks } from './task-details'
import { DeleteBoard } from '../containers/board-actions'
import { DeleteTask } from '../containers/task-actions'
import { HeadingM, HeadingS, HeadingXL } from './heading'
import { StandardButtonLink } from './link/StyledLink'
import { BoardsMobileNav, BoardsNavigation } from './boards-nav'
import '../styles/board.scss'

export const BoardsHome = () => {
  const [state] = useAppData()

  return (
    <>
      <div className="board__toolbar empty"></div>
      <section className="board__details empty">
        {state.USER_BOARDS.length ? (
          <p>Hey! Choose one of the boards on the left to get started.</p>
        ) : (
          <p>Your dashboard is empty. Create a new board to get started.</p>
        )}
      </section>
    </>
  )
}


const BoardTask = ({ task, location }) => {
  const { boardId, title, subtasks, id } = task
  const completedSubtasks = getCompletedSubtasks(subtasks)

  return task ? (
    <li className='task-linkcard'>
      <HeadingM tag="h4">{title}</HeadingM>
      <p className="body-m">
        {completedSubtasks} of {subtasks.length} subtasks
      </p>
      <Link
        to={`/boards/${boardId}/tasks/${id}`}
        state={{ backgroundLocation: location }}
        className="stretched-link"></Link>
    </li>
  ) : null
}

function Board() {
  const [state, dispatch] = useAppData()
  const location = useLocation()
  const { boardId } = useParams()

  useEffect(() => {
    const fetchBoard = () => {
      const data = JSON.parse(window.sessionStorage.getItem(BOARDS_KEY))
      const boardData = data.find((b) => b.id == boardId)

      dispatch({ type: 'SET_ACTIVE_BOARD', payload: boardData })
    }
    fetchBoard()
  }, [boardId])

  const { ACTIVE_BOARD: board, DELETE_BOARD, DELETE_TASK } = state

  const hasColumns = board && board.columns && board.columns.length

  return (
    <>
      <div className={`board__toolbar ${board ? '' : 'empty'}`}>
        {board && (
          <>
            <HeadingXL className="board-name" tag="h2">
              {board.name}
            </HeadingXL>

            <nav className="temp">
              <Link
                to={hasColumns ? `/boards/${board.id}/new-task` : '#'}
                state={{ backgroundLocation: location }}
                className={hasColumns ? undefined : 'disabled'}>
                Add Task
              </Link>

              <Link
                to={`/boards/${board.id}/edit`}
                state={{ backgroundLocation: location }}>
                Edit Board
              </Link>
              <button
                onClick={() =>
                  dispatch({ type: 'OPEN_DELETE_BOARD', payload: true })
                }>
                Delete Board
              </button>
            </nav>
          </>
        )}
      </div>

      <section className={`board__details ${hasColumns ? '' : 'empty'}`}>
        {board ? (
          <>
            {hasColumns ? (
              <>
                {board.columns.map((column) => (
                  <section className="board-column" key={column.columnId}>
                    <HeadingS tag="h3">
                      {column.name} ({column.tasks?.length || 0})
                    </HeadingS>
                    <ul className="column-tasks">
                      {column.tasks?.length
                        ? column.tasks.map((task) => (
                            <BoardTask
                              task={task}
                              location={location}
                              key={`task-${task.id}`}
                            />
                          ))
                        : null}
                    </ul>
                  </section>
                ))}

                <section className="new-column">
                  <Link
                    className="heading-xl"
                    to={`/boards/${board.id}/edit`}
                    state={{ backgroundLocation: location }}>
                    + New Column
                  </Link>
                </section>
              </>
            ) : (
              <>
                <p>This board is empty. Create a new column to get started.</p>

                <StandardButtonLink
                  to={`/boards/${board.id}/edit`}
                  state={{ backgroundLocation: location }}>
                  + Add New Column
                </StandardButtonLink>
              </>
            )}
          </>
        ) : (
          <>
            <p>Ups, this board does not exist anymore!</p>
          </>
        )}
      </section>

      {DELETE_BOARD && <DeleteBoard />}
      {DELETE_TASK && <DeleteTask />}
    </>
  )
}

export default Board
