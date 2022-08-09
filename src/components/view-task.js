import { useState } from 'react'
import { useAppData } from '../context/app-data'
import DropdownSelect from './select'

export function getCompletedSubtasks(subtasks) {
  if (!Array.isArray(subtasks) || !subtasks.length) return
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
    <label className={`body-m ${isChecked ? 'label-checked' : undefined}`}>
      <input
        type="checkbox"
        value={subtask.title}
        onChange={handleChange}
        checked={isChecked}
      />
      <span
        className={`checkmark ${isChecked ? 'checkbox-active' : undefined}`}
        aria-hidden="true"></span>
      {subtask.title}
    </label>
  )
}

function TaskView({ task }) {
  const [state] = useAppData()

  const handleSubtaskChange = (value) => console.log(value)

  const handleStatusChange = (value) => console.log(value)

  const dropdownProps = {
    id: 'dropdown-task-status',
    options:
      state.ACTIVE_BOARD &&
      state.ACTIVE_BOARD.columns.map((c) => c.name.toLowerCase()),
    selected: task?.status?.toLowerCase(),
    onChange: handleStatusChange,
    label: 'Current Status'
  }

  const completed = getCompletedSubtasks(task.subtasks)

  return (
    <>
      <h2 id="dialog-label" className="heading-l">
        {task?.title}
      </h2>

      <p className="view-task-desc body-l">{task?.description}</p>

      <form className='view-task-form'>
        {task?.subtasks?.length ? (
          <fieldset className="subtasks-group">
            <legend className="subtitle-s">
              Subtasks {completed} of {task.subtasks?.length}
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

        <DropdownSelect {...dropdownProps} />
      </form>
    </>
  )
}

export default TaskView
