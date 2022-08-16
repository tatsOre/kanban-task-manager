import { useState } from 'react'
import { useAppData } from '../context/app-data'
import { PrimaryButton, SecondaryButton, StandardButton } from './button/index'
import SelectInput from './selectInput'

function TaskForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState({ ...initialValues })
  const [errors, setErrors] = useState({})
  const [state] = useAppData()

  const placeholders = ['e.g. Make coffee', 'e.g. Drink coffee & smile']

  const boardColumns =
    state.ACTIVE_BOARD &&
    state.ACTIVE_BOARD.columns.map((c) => ({
      value: c.name.toLowerCase(),
      label: c.name
    }))

  const dropdownProps = {
    id: 'dropdown-task-status',
    options: boardColumns,
    selected: values.status?.toLowerCase(),
    onChange: (val) => setValues((s) => ({ ...s, status: val })),
    inputLabel: 'Status'
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
      if (edit) {
        onSubmit({ ...values })
      } else {
        onSubmit({
          ...values,
          status: values.status || boardColumns[0].value,
          boardId: state.ACTIVE_BOARD.id
        })
      }
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
                  <StandardButton
                    onClick={() => removeArrayItem(index)}
                    iconStart="close"
                  />

                  {errors.subtasks && errors.subtasks[index] ? (
                    <strong>Can't be empty</strong>
                  ) : null}
                </li>
              ))}
          </ul>

          <SecondaryButton onClick={appendArrayItem}>
            + Add New Subtask
          </SecondaryButton>
        </div>

        <div className="input-group">
          <SelectInput {...dropdownProps} />
        </div>

        <PrimaryButton type="submit">
          {edit ? 'Save Changes' : 'Create Task'}
        </PrimaryButton>
      </form>
    </>
  )
}

export default TaskForm
