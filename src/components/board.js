import { useEffect, memo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { getCompletedSubtasks } from './view-task'
import { DeleteBoard, DeleteTask } from './modals'
import { BOARDS_KEY } from '../utils/constants'

const BoardHeading = ({ name }) => <h2 className="board-name">{name}</h2>

const BoardTask = ({ board, task }) => {
  const location = useLocation()
  const { title, subtasks, id } = task
  const completedSubtasks = getCompletedSubtasks(subtasks)

  return task ? (
    <li>
      <h4 className="task-title heading-m">{title}</h4>
      <p className="body-m">
        {completedSubtasks} of {subtasks.length} subtasks
      </p>
      <Link
        to={`/boards/${board}/tasks/${id}`}
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

  return (
    <>
      <div className={`board-toolbar ${board ? '' : 'empty'}`}>
        {board && (
          <>
            <BoardHeading name={board.name} />

            <nav className="temp">
              <Link
                to={`/boards/${board.id}/new-task`}
                state={{ backgroundLocation: location }}>
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

      <section className={`board-details ${board ? '' : 'empty'}`}>
        {board ? (
          <>
            {board.columns?.length ? (
              <>
                {board.columns.map((column) => (
                  <section className="board-column" key={column.columnId}>
                    <h3 className="heading-s">
                      {column.name} ({column.tasks?.length || 0})
                    </h3>
                    <ul className="column-tasks">
                      {column.tasks?.length
                        ? column.tasks.map((task) => (
                            <BoardTask
                              board={board.id}
                              task={task}
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
                <Link
                  to={`/boards/${board.id}/edit`}
                  state={{ backgroundLocation: location }}>
                  + Add New Column
                </Link>
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
