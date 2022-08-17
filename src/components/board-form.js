import { useState } from 'react'
import uuid from 'react-uuid'
import { COLUMN_SCHEMA } from '../utils/constants'

import { InputAppearances } from './shared/types/appearance'
import { PrimaryButton, SecondaryButton, StandardButton } from './button/index'
import TextInput from './textInput'

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
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <TextInput
          appearance={errors.name ? InputAppearances.Error : undefined}
          className="input-group"
          errors={errors.name}
          id="board-name"
          inputLabel={`${edit ? 'Board ' : ''}Name`}
          name="name"
          maxLength="40"
          onChange={onChange}
          placeholder="e.g. Web Design"
          value={values.name}
          required
        />

        <div>
          <label id="columns-list" className="form-label">
            {edit && 'Board'} Columns
          </label>
          <ul aria-labelledby="columns-list" className="input-list">
            {values.columns?.map(({ name }, index) => {
              const hasError =
                errors.columns &&
                errors.columns[index] &&
                !values.columns[index].name

              return (
                <li key={`column-${index}`}>
                  <TextInput
                    appearance={hasError ? InputAppearances.Error : undefined}
                    className="input-group"
                    errors={hasError && errors.columns[index]}
                    inputLabel="column name"
                    showInputLabel={false}
                    onChange={(e) => onChangeArrayItem(e, index)}
                    value={name}
                  />

                  <StandardButton
                    onClick={() => removeArrayItem(index)}
                    iconStart="close"
                  />
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
