import { useState } from 'react'
import { useAppData } from '../context/app-data'
import { Button, CloseButton } from './button'
import DropdownSelect from './select'

function TaskForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState({ ...initialValues })
  const [errors, setErrors] = useState({})
  const [state] = useAppData()
  const placeholders = ['e.g. Make coffee', 'e.g. Drink coffee & smile']

  const dropdownProps = {
    id: 'dropdown-task-status',
    options:
      state.ACTIVE_BOARD &&
      state.ACTIVE_BOARD.columns.map((c) => c.name.toLowerCase()),
    selected: values?.status?.toLowerCase(),
    onChange: () => {},
    label: 'Status'
  }

  const onChange = ({ target }) => {
    if (errors[target.name]) {
      errors[target.name] = ''
    }
    setValues((s) => ({ ...s, [target.name]: target.value }))
  }

  const onChangeArrayItem = (e, idx) => {
    if (errors.subtasks && errors.subtasks[idx]) {
      errors.subtasks[idx] = ''
    }

    const edited = values.subtasks.map((s, index) => {
      if (idx === index) {
        return { ...s, title: e.target.value }
      }
      return s
    })
    setValues((s) => ({ ...s, subtasks: edited }))
  }

  const appendArrayItem = () => {
    setValues((s) => ({
      ...s,
      subtasks: [...s.subtasks, { title: '', isCompleted: false }]
    }))
  }

  const removeArrayItem = (idx) => {
    const filtered = values.subtasks.filter((s, index) => index !== idx)
    setValues((s) => ({ ...s, subtasks: filtered }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let valid = true

    if (!values.title) {
      valid = false
      setErrors((s) => ({ ...s, title: "Can't be empty" }))
    }

    if (values.subtasks.length) {
      values.subtasks.forEach((s, idx) => {
        if (!s.title) {
          valid = false
          setErrors((s) => ({
            ...s,
            subtasks: { ...s.subtasks, [idx]: "Can't be empty" }
          }))
        }
      })
    }

    if (valid) {
      onSubmit({ ...values })
    }
  }

  return (
    <>
      <h2 id="dialog-label" className="heading-l">
        {edit ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            placeholder="e.g. Take coffee break"
            onChange={onChange}
            className={errors.title ? 'invalid' : undefined}
          />
          {errors.title ? <strong>Can't be empty</strong> : null}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={onChange}
            rows="6"
            className={errors.description ? 'invalid' : undefined}
          />
        </div>

        <div className="input-group">
          <label id="subtasks-list">Subtasks</label>
          <ul aria-labelledby="subtasks-list" className="form-input-list">
            {values.subtasks &&
              values.subtasks.map((subtask, index) => (
                <li key={`subtask-${index}`}>
                  <input
                    aria-label=""
                    value={subtask.title}
                    placeholder={placeholders[index] || 'Add subtask'}
                    type="text"
                    onChange={(e) => onChangeArrayItem(e, index)}
                    className={
                      errors.subtasks && errors.subtasks[index]
                        ? 'invalid'
                        : undefined
                    }
                  />
                  <CloseButton onClick={() => removeArrayItem(index)} />
                  {errors.subtasks && errors.subtasks[index] ? (
                    <strong>Can't be empty</strong>
                  ) : null}
                </li>
              ))}
          </ul>

          <Button type="button" onClick={appendArrayItem} variant="secondary">
            + Add New Subtask
          </Button>
        </div>

        <div className="input-group">
          <DropdownSelect {...dropdownProps} />
        </div>

        <Button type="submit">{edit ? 'Save Changes' : 'Create Task'}</Button>
      </form>
    </>
  )
}

export default TaskForm
