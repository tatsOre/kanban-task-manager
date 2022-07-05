import { useState } from 'react'
import IconVerticalEllipsis from './icons/icon-vertical-ellipsis'
import DropdownSelect from './select'

function ViewTask({ data, board }) {
  const [task, setTask] = useState({ ...data })

  const onChange = (e) => {
    console.log(e.target.value)
  }

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: [
      
    ],
    selected: task.status.toLowerCase(),
    onChange: (value) => console.log('Selected value:', value),
    label: 'Current Status',
    disabled: false
  }

  return (
    <>
      <h2 className="heading-l">{task.title}</h2>
      <button>
        <IconVerticalEllipsis />
      </button>
      <p className="view-task-desc body-l">{task.description}</p>
      {task.subtasks.length ? (
        <>
          <h3 className="subtitle-s">Subtasks 2 of 3</h3>
          <ul className="view-task-list">
            {task.subtasks.map((subtask, index) => (
              <li key={`subtask-${index}`}>
                <input
                  id=""
                  value={subtask.title}
                  type="checkbox"
                  onChange={(e) => onChange(e, index)}
                  checked={subtask.isCompleted}
                />
                <span className="checkmark"></span>
                <label htmlFor="" className="body-m">
                  {subtask.title}
                </label>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <DropdownSelect {...dropdownProps} />
    </>
  )
}

export default ViewTask
