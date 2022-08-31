import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CheckboxInput from './checkbox'
import SelectInput from './selectInput'

export function getCompletedSubtasks(subtasks) {
  if (!Array.isArray(subtasks)) return 0
  return subtasks.filter((t) => t.isCompleted).length
}

function TaskDetails({ board, task, dispatch }) {
  const [subtasks, setSubtasks] = useState([...task.subtasks])

  const navigate = useNavigate()

  const handleSubtaskChange = (e) => {
    const updatedSubtasks = subtasks.map((s) =>
      s.title === e.target.value ? { ...s, isCompleted: !s.isCompleted } : s
    )
    setSubtasks(updatedSubtasks)
  }

  const handleStatusChange = (value) => console.log(value)

  const boardColumns =
    board.columns &&
    board.columns.map((c) => ({
      value: c.name.toLowerCase(),
      label: c.name
    }))

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: boardColumns,
    selected: task.status?.toLowerCase(),
    onChange: handleStatusChange,
    inputLabel: 'Current Status'
  }

  const completedSubtasks = getCompletedSubtasks(subtasks)

  return (
    <>
      <div className="temp task">
        <Link
          to={`/boards/${board.id}/edit/${task.id}`}
          state={{ backgroundLocation: `/boards/${board.id}` }}>
          Edit Task
        </Link>

        <button
          onClick={() => {
            navigate(-1)
            dispatch({ type: 'OPEN_DELETE_TASK', payload: true })
          }}>
          Delete Task
        </button>
      </div>

      {task.description ? (
        <p className="view-task-desc body-l">{task.description}</p>
      ) : null}

      <form className="view-task-form standard">
        {task.subtasks?.length ? (
          <fieldset>
            <legend style={{ paddingBlockEnd: '0.5rem' }}>
              Subtasks {completedSubtasks} of {subtasks.length}
            </legend>

            {subtasks.map((subtask) => (
              <CheckboxInput
                key={`subtask-${subtask.title}`}
                checked={subtask.isCompleted}
                className="subtask-input"
                onChange={handleSubtaskChange}
                value={subtask.title}
                inputLabel={subtask.title}
                showCheckedLabel={true}
              />
            ))}
          </fieldset>
        ) : null}

        <div className="input-group">
          <SelectInput {...dropdownProps} />
        </div>
      </form>
    </>
  )
}

export default TaskDetails
