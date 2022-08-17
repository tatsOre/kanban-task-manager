import { useState } from 'react'
import { useAppData } from '../context/app-data'
import { InputAppearances } from './shared/types/appearance'
import { PrimaryButton, SecondaryButton, StandardButton } from './button/index'
import SelectInput from './selectInput'
import Textarea from './textarea'
import TextInput from './textInput'

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
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <TextInput
          appearance={errors.title ? InputAppearances.Error : undefined}
          className="input-group"
          errors={errors.title}
          id="task-title"
          inputLabel="Title"
          name="title"
          onChange={onChange}
          placeholder="e.g. Take coffee break"
          value={values.title}
          required
        />

        <Textarea
          appearance={errors.description ? InputAppearances.Error : undefined}
          className="textarea-group"
          id="description"
          inputLabel="Description"
          name="description"
          value={values.description}
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          onChange={onChange}
          rows="6"
        />

        <div>
          <label id="subtasks-list" className='form-label'>Subtasks</label>
          <ul aria-labelledby="subtasks-list" className="input-list">
            {values.subtasks &&
              values.subtasks.map((subtask, index) => (
                <li key={`subtask-${index}`}>
                  <TextInput
                    appearance={
                      errors.subtasks && errors.subtasks[index]
                        ? InputAppearances.Error
                        : undefined
                    }
                    className="input-group"
                    errors={errors.subtasks && errors.subtasks[index]}
                    inputLabel="Subtask Title"
                    showInputLabel={false}
                    placeholder={placeholders[index] || 'Add subtask'}
                    onChange={(e) => onChangeArrayItem(e, index)}
                    value={subtask.title}
                  />

                  <StandardButton
                    onClick={() => removeArrayItem(index)}
                    iconStart="close"
                  />
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
