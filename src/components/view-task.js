import { useState } from 'react'
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
  const handleSubtaskChange = (value) => console.log(value)

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: [
      { label: 'Todo', value: 'todo' },
      { label: 'Doing', value: 'doing' },
      { label: 'Done', value: 'done' }
    ],
    selected: task?.status?.toLowerCase(),
    onChange: (value) => console.log('Selected value:', value),
    label: 'Current Status',
    disabled: false
  }

  const completed = getCompletedSubtasks(task.subtasks)

  return (
    <>
      <h2 id="dialog-label" className="heading-l">
        {task?.title}
      </h2>

      <p className="view-task-desc body-l">{task?.description}</p>

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
    </>
  )
}

export default TaskView
