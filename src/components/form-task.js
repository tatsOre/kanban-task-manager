import { useState } from 'react'

import { useTheme } from './context/theme'

import { useFormSubmission } from './hooks/use-form-submission'

import { Button } from './button'

import { POST_TASK, PUT_TASK } from '../utils/routes'

function TaskSubmission({ initialValues, edit }) {
  const [formData, setFormData] = useState(null)

  const { status, response, error } = useFormSubmission({
    method: edit ? 'PUT' : 'POST',
    endpoint: edit ? PUT_TASK : POST_TASK,
    data: formData
  })

  /*  TODO: update here the state of the board */

  return (
    <div>
      {status === 'resolved' ? <pre>{JSON.stringify(response, undefined, 2)}</pre> : null}
      {status === 'rejected' ? (
        <div role="alert" style={{ color: 'red' }}>
          {error}
        </div>
      ) : null}
      <TaskForm initialValues={initialValues} edit={edit} onSubmit={setFormData} />
    </div>
  )
}



function TaskForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState({})

  const [theme] = useTheme()

  const placeholders = ['e.g. Make coffee', 'e.g. Drink coffee & smile']

  const onChange = ({ target }) => {
    if (errors[target.name]) {
      errors[target.name] = ''
    }
    setValues((s) => ({ ...s, [target.name]: target.value }))
  }

  const onChangeSubtask = (e, idx) => {
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

  const appendSubtask = () => {
    setValues((s) => ({ ...s, subtasks: [...s.subtasks, { title: '', isCompleted: false }] }))
  }

  const removeSubtask = (idx) => {
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

    if (!values.description) {
      valid = false
      setErrors((s) => ({ ...s, description: "Can't be empty" }))
    }

    if (values.subtasks.length) {
      values.subtasks.forEach((s, idx) => {
        if (!s.title) {
          valid = false
          setErrors((s) => ({ ...s, subtasks: { ...s.subtasks, [idx]: "Can't be empty" } }))
        }
      })
    }

    if (valid) {
      onSubmit({ ...values })
    }
  }

  return (
    <>
      <h2>{edit ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" value={values.title} onChange={onChange} />
          {errors.title ? <strong>Can't be empty</strong> : null}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={onChange}
          />
          {errors.description ? <strong>Can't be empty</strong> : null}
        </div>

        <p>Subtasks</p>
        <ul>
          {values.subtasks.map((subtask, index) => (
            <li key={`subtask-${index}`}>
              <input
                aria-label=""
                value={subtask.title}
                placeholder={placeholders[index] || "e.g. Beautiful Subtask"}
                type="text"
                onChange={(e) => onChangeSubtask(e, index)}
              />
              <button type="button" onClick={() => removeSubtask(index)}>
                X
              </button>
              {errors.subtasks && errors.subtasks[index] ? <strong>Can't be empty</strong> : null}
            </li>
          ))}
        </ul>

        <button type="button" onClick={appendSubtask}>
          + Add New Subtask
        </button>

        <label>Status</label>
        <select name="status" value={values.status} onChange={onChange}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <Button type="submit">{edit ? 'Save Changes' : 'Create Task'}</Button>
      </form>
    </>
  )
}

export default TaskSubmission
