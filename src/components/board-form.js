import { useState } from 'react'
import { Button, CloseButton } from './button'

function BoardForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState({})

  const onChange = ({ target: { name, value } }) => {
    if (errors[name]) {
      errors[name] = ''
    }
    setValues((s) => ({ ...s, [name]: value }))
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
          setErrors((s) => ({
            ...s,
            columns: { ...s.columns, [idx]: "Can't be empty" }
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
        {edit ? 'Edit Board' : 'Add New Board'}
      </h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label htmlFor="name">{edit && 'Board'} Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            placeholder="e.g. Web Design"
            onChange={onChange}
            className={errors.name ? 'invalid' : undefined}
          />
          {errors.name ? <strong>Can't be empty</strong> : null}
        </div>

        <div className="input-group">
          <label id="columns-list">{edit && 'Board'} Columns</label>
          <ul aria-labelledby="columns-list" className="form-input-list">
            {values.columns.map((column, index) => (
              <li key={`column-${index}`}>
                <input
                  aria-label=""
                  value={column.name}
                  type="text"
                  onChange={(e) => onChangeArrayItem(e, index)}
                  className={
                    errors.columns && errors.columns[index]
                      ? 'invalid'
                      : undefined
                  }
                />
                <CloseButton onClick={() => removeArrayItem(index)} />
                {errors.columns && errors.columns[index] ? (
                  <strong>Can't be empty</strong>
                ) : null}
              </li>
            ))}
          </ul>

          <Button type="button" onClick={appendArrayItem} variant="secondary">
            + Add New Column
          </Button>
        </div>

        <Button type="submit">
          {edit ? 'Save Changes' : 'Create New Board'}
        </Button>
      </form>
    </>
  )
}

export default BoardForm
