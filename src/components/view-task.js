import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import { DialogHeading } from './modals'
import SelectInput from './selectInput'

export function getCompletedSubtasks(subtasks) {
  if (!Array.isArray(subtasks) || !subtasks.length) return 0
  return subtasks.filter((t) => t.isCompleted).length
}

function Checkbox({ subtask, onChange }) {
  const [isChecked, setIsChecked] = useState(subtask?.isCompleted)

  const handleChange = (e) => {
    onChange(e.target.value)
    setIsChecked(!isChecked)
  }

  if (!subtask) return null

  return (
    <label className={`body-m ${isChecked ? 'label-checked' : ''}`}>
      <input
        type="checkbox"
        value={subtask.title}
        onChange={handleChange}
        checked={isChecked}
      />
      <span
        className={`checkmark ${isChecked ? 'checkbox-active' : ''}`}
        aria-hidden="true"></span>
      {subtask.title}
    </label>
  )
}

function TaskView() {
  const [state, dispatch] = useAppData()

  const navigate = useNavigate()

  const { ACTIVE_BOARD: board, ACTIVE_TASK: task } = state

  const handleSubtaskChange = (value) => console.log(value)

  const handleStatusChange = (value) => console.log(value)

  const boardColumns =
    state.ACTIVE_BOARD &&
    state.ACTIVE_BOARD.columns.map((c) => ({
      value: c.name.toLowerCase(),
      label: c.name
    }))

  console.log(boardColumns)

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: boardColumns,
    selected: task?.status?.toLowerCase(),
    onChange: handleStatusChange,
    inputLabel: 'Current Status'
  }

  const completedSubtasks = getCompletedSubtasks(task.subtasks)

  return (
    <>
      <DialogHeading>{task?.title}</DialogHeading>

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

      <p className="view-task-desc body-l">{task?.description}</p>
      <form className="view-task-form">
        {task?.subtasks?.length ? (
          <fieldset className="subtasks-group">
            <legend className="subtitle-s">
              Subtasks {completedSubtasks} of {task.subtasks?.length}
            </legend>

            {task.subtasks.map((subtask) => (
              <Checkbox
                key={`subtask-${subtask?.title}`}
                subtask={subtask}
                onChange={handleSubtaskChange}
              />
            ))}
          </fieldset>
        ) : null}

        <SelectInput {...dropdownProps} />
      </form>
    </>
  )
}

export default TaskView
