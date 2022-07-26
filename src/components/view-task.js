import { useState } from 'react'

import IconVerticalEllipsis from './icons/icon-vertical-ellipsis'
import DropdownSelect from './select'

function ViewTask({ data, board }) {
  const [task, setTask] = useState({ ...data })

  const [open, setOpen] = useState(false)

  const handleSubtaskChange = (value) => console.log(value)

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: [
      { label: 'Todo', value: 'todo' },
      { label: 'Doing', value: 'doing' },
      { label: 'Done', value: 'done' }
    ],
    selected: task.status.toLowerCase(),
    onChange: (value) => console.log('Selected value:', value),
    label: 'Current Status',
    disabled: false
  }

  return (
    <>
      <h2 id="task-dialog-title" className="heading-l">
        {task.title}
      </h2>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded="false">
        <span aria-hidden="true">
          <IconVerticalEllipsis />
        </span>
      </button>

      <div role="menu" hidden={!open}>
        <button role="menuitem">Edit Task</button>
        <button role="menuitem">Delete Task</button>
      </div>

      <p className="view-task-desc body-l">{task.description}</p>

      {task.subtasks.length ? (
        <fieldset className="subtasks-group">
          <legend className="subtitle-s">
            Subtasks 2 of {task.subtasks?.length}
          </legend>

          {task.subtasks.map((subtask) => (
            <Checkbox
              key={`subtask-${subtask.title}`} // TODO: change to ID
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

function Checkbox({ subtask, onChange }) {
  const [isChecked, setIsChecked] = useState(subtask.isCompleted)

  const handleChange = (e) => {
    onChange(e.target.value)
    setIsChecked(!isChecked)
  }
  return (
    <label className={`body-m ${isChecked ? 'label-checked' : ''}`}>
      <input
        type="checkbox"
        value={subtask.title} // TODO: change to ID
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

export default ViewTask
