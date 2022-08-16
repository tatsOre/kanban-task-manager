import { useState } from 'react'
import uuid from 'react-uuid'

import { PrimaryButton, SecondaryButton, StandardButton } from './button/index'
import { COLUMN_SCHEMA } from '../utils/constants'

function BoardForm({ initialValues, edit, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const onChange = ({ target: { name, value } }) => {
    if (errors[name]) errors[name] = ''
    setValues((s) => ({ ...s, [name]: value }))
  }

  const onChangeArrayItem = (e, idx) => {
    if (errors.columns && errors.columns[idx]) errors.columns[idx] = ''

    const updatedColumns = values.columns.map((col, index) =>
      idx === index ? { ...col, name: e.target.value } : col
    )
    setValues((state) => ({ ...state, columns: updatedColumns }))
  }

  const appendArrayItem = () =>
    setValues((state) => ({
      ...state,
      columns: [...state.columns, { columnId: uuid(), ...COLUMN_SCHEMA }]
    }))

  const removeArrayItem = (idx) =>
    setValues((state) => ({
      ...state,
      columns: [...state.columns.slice(0, idx), ...state.columns.slice(idx + 1)]
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    let valid = true

    if (!values.name) {
      valid = false
      setErrors((s) => ({ ...s, name: "Can't be empty" }))
    }

    if (values.columns.length) {
      values.columns.forEach((column, idx) => {
        if (!column.name) {
          valid = false
          setErrors((state) => ({
            ...state,
            columns: { ...state.columns, [idx]: "Can't be empty" }
          }))
        }
      })
    }

    if (valid) onSubmit({ ...values })
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
            maxLength="40"
          />
          {errors.name ? <strong>Can't be empty</strong> : null}
        </div>

        <div className="input-group">
          <label id="columns-list">{edit && 'Board'} Columns</label>
          <ul aria-labelledby="columns-list" className="form-input-list">
            {values.columns?.map(({ name }, index) => {
              const inputError =
                errors.columns &&
                errors.columns[index] &&
                !values.columns[index].name

              return (
                <li key={`column-${index}`}>
                  <input
                    aria-label="column name"
                    value={name}
                    type="text"
                    onChange={(e) => onChangeArrayItem(e, index)}
                    className={inputError ? 'invalid' : undefined}
                  />

                  <StandardButton
                    onClick={() => removeArrayItem(index)}
                    iconStart="close"
                  />

                  {inputError ? <strong>Can't be empty</strong> : null}
                </li>
              )
            })}
          </ul>

          <SecondaryButton onClick={appendArrayItem}>
            + Add New Column
          </SecondaryButton>
        </div>

        <PrimaryButton type="submit">
          {edit ? 'Save Changes' : 'Create New Board'}
        </PrimaryButton>
      </form>
    </>
  )
}

export default BoardForm
