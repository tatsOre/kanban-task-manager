import { useEffect } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { getCompletedSubtasks } from './view-task'

import json from '../data/data.json' // UI Implementation

import { DeleteBoard, DeleteTask } from './modals'

const BoardHeading = ({ name }) => <h2 className="board-name">{name}</h2>

const BoardTaskItem = ({ board, data }) => {
  const location = useLocation()
  const completed = getCompletedSubtasks(data.subtasks)

  return data ? (
    <li>
      <h4 className="task-title heading-m">{data.title}</h4>
      <p className="body-m">
        {completed} of {data.subtasks?.length} subtasks
      </p>
      <Link
        to={`/boards/${board}/tasks/${data.id}`}
        state={{ backgroundLocation: location }}
        className="stretched-link"></Link>
    </li>
  ) : null
}

function Board() {
  const [state, dispatch] = useAppData()
  const { boardId } = useParams()
  const location = useLocation()

  useEffect(() => {
    const fetchBoard = () => {
      const board = json.boards.find((b) => b.id === parseInt(boardId))
      dispatch({ type: 'SET_ACTIVE_BOARD', payload: board })
    }
    fetchBoard()
  }, [boardId])

  const { ACTIVE_BOARD: data } = state

  return (
    <>
      {state.ACTIVE_BOARD ? (
        <>
          <div className="board-toolbar">
            <BoardHeading name={data.name} />

            <div className="temp">
              <Link
                to="/boards/tasks/new"
                state={{ backgroundLocation: location }}>
                Add Task
              </Link>

              <Link
                to={`/boards/edit/${data.id}`}
                state={{ backgroundLocation: location }}>
                Edit Board
              </Link>
              <button
                onClick={() =>
                  dispatch({ type: 'OPEN_DELETE_BOARD', payload: true })
                }>
                Delete Board
              </button>
            </div>
          </div>

          <section className="board-details">
            {data.columns?.length ? (
              <>
                {data.columns.map((column) => (
                  <section className="board-column" key={column.name}>
                    <h3 className="heading-s">
                      {column.name} ({column.tasks.length})
                    </h3>
                    <ul className="column-tasks">
                      {column.tasks.length
                        ? column.tasks.map((task) => (
                            <BoardTaskItem
                              board={data.id}
                              data={task}
                              key={`task-${task.id}`}
                            />
                          ))
                        : null}
                    </ul>
                  </section>
                ))}

                <section className="new-column">
                  <NavLink
                    className="heading-xl"
                    to={`/boards/edit/${data.id}`}
                    state={{ backgroundLocation: location }}>
                    + New Column
                  </NavLink>
                </section>
              </>
            ) : (
              <>
                <p>This board is empty. Create a new column to get started.</p>
                <NavLink
                  to={`/boards/edit/${data.id}`}
                  state={{ backgroundLocation: location }}>
                  + Add New Column
                </NavLink>
              </>
            )}
          </section>
        </>
      ) : (
        <p>Ups, this board does not exist anymore!</p>
      )}
      {state.DELETE_BOARD && <DeleteBoard />}
      {state.DELETE_TASK && <DeleteTask />}
    </>
  )
}

export default Board
