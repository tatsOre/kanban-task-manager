import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { Button } from './button'

import json from '../data/data.json' // UI Implementation
import { getCompletedSubtasks } from './view-task'

const BoardHeading = ({ name }) => <h2 className="board-name">{name}</h2>

const BoardTaskItem = ({ data }) => {
  const location = useLocation()

  const completed = getCompletedSubtasks(data.subtasks)

  return data ? (
    <li>
      <h4 className="task-title heading-m">{data.title}</h4>
      <p className="body-m">
        {completed} of {data.subtasks?.length} subtasks
      </p>
      <Link
        to={`/tasks/${data.id}`}
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
      const board = json.boards.find((b) => b.id == boardId)
      dispatch({ type: 'SET_ACTIVE_BOARD', payload: board })
    }
    fetchBoard()
  }, [boardId])

  if (!state.ACTIVE_BOARD) return null

  const { ACTIVE_BOARD: data } = state

  return (
    <>
      <div className="board-toolbar">
        <BoardHeading name={data.name} />
        <Link
          to={`/boards/edit/${data.id}`}
          state={{ backgroundLocation: location }}>
          Edit
        </Link>
      </div>

      <section className="board-details">
        {data.columns.length ? (
          <>
            {data.columns.map((column) => (
              <section className="board-column">
                <h3 className="heading-s">
                  {column.name} ({column.tasks.length})
                </h3>
                <ul className="column-tasks">
                  {column.tasks.length
                    ? column.tasks.map((task) => (
                        <BoardTaskItem
                          board={data.id}
                          data={task}
                          onClick={() => {}}
                        />
                      ))
                    : null}
                </ul>
              </section>
            ))}

            <section className="new-column">
              <button className="heading-xl" type="button">
                + New Column
              </button>
            </section>
          </>
        ) : (
          <>
            <p>This board is empty. Create a new column to get started.</p>
            <Button size="large">+ Add New Column</Button>
          </>
        )}
      </section>
    </>
  )
}

export default Board
