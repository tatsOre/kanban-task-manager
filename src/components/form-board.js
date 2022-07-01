import { useState } from 'react'

import { useTheme } from './context/theme'

import { Button, CloseButton } from './button'

function BoardForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState({})

  const [theme] = useTheme()

  const onChange = ({ target }) => {
    if (errors[target.name]) {
      errors[target.name] = ''
    }
    setValues((s) => ({ ...s, [target.name]: target.value }))
  }

  const onChangeArrayItem = (e, idx) => {
    if (errors.columns && errors.columns[idx]) {
      errors.columns[idx] = ''
    }

    const edited = values.columns.map((s, index) => {
      if (idx === index) {
        return { ...s, name: e.target.value }
      }
      return s
    })
    setValues((s) => ({ ...s, columns: edited }))
  }

  const appendArrayItem = () => {
    setValues((s) => ({ ...s, columns: [...s.columns, { name: '' }] }))
  }

  const removeArrayItem = (idx) => {
    const filtered = values.columns.filter((s, index) => index !== idx)
    setValues((s) => ({ ...s, columns: filtered }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let valid = true

    if (!values.name) {
      valid = false
      setErrors((s) => ({ ...s, name: "Can't be empty" }))
    }

    if (values.columns.length) {
      values.columns.forEach((s, idx) => {
        if (!s.name) {
          valid = false
          setErrors((s) => ({ ...s, columns: { ...s.columns, [idx]: "Can't be empty" } }))
        }
      })
    }

    if (valid) {
      onSubmit({ ...values })
    }
  }

  return (
    <>
      <h2 className="heading-l">{edit ? 'Edit Board' : 'Add New Board'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
            className={errors.name ? 'invalid' : undefined}
          />
          {errors.name ? <strong>Can't be empty</strong> : null}
        </div>

        <label>Columns</label>
        <ul className="form-input-list">
          {values.columns.map((column, index) => (
            <li key={`column-${index}`}>
              <input
                aria-label=""
                value={column.name}
                type="text"
                onChange={(e) => onChangeArrayItem(e, index)}
                className={errors.columns && errors.columns[index] ? 'invalid' : undefined}
              />
              <CloseButton onClick={() => removeArrayItem(index)} />
              {errors.columns && errors.columns[index] ? <strong>Can't be empty</strong> : null}
            </li>
          ))}
        </ul>

        <Button type="button" onClick={appendArrayItem} variant="secondary">
          + Add New Column
        </Button>

        <Button type="submit">{edit ? 'Save Changes' : 'Create New Board'}</Button>
      </form>
    </>
  )
}

export default BoardForm
