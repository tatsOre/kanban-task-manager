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
    <form onSubmit={handleSubmit} className="standard" noValidate>
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
        id="task-description"
        inputLabel="Description"
        name="description"
        onChange={onChange}
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        rows="6"
        value={values.description}
      />

      <fieldset>
        <legend>Subtasks</legend>

        {values.subtasks &&
          values.subtasks.map((subtask, index) => (
            <div className="fieldset-item">
              <TextInput
                appearance={
                  errors.subtasks && errors.subtasks[index]
                    ? InputAppearances.Error
                    : undefined
                }
                className="input-group"
                errors={errors.subtasks && errors.subtasks[index]}
                inputLabel="Subtask Title"
                onChange={(e) => onChangeArrayItem(e, index)}
                placeholder={placeholders[index] || 'Add subtask'}
                showInputLabel={false}
                value={subtask.title}
              />

              <StandardButton
                className="close-button"
                onClick={() => removeArrayItem(index)}
                iconStart="cross"
              />
            </div>
          ))}

        <SecondaryButton onClick={appendArrayItem}>
          + Add New Subtask
        </SecondaryButton>
      </fieldset>

      <div className="input-group">
        <SelectInput {...dropdownProps} />
      </div>

      <PrimaryButton type={edit ? 'button' : 'submit'}>
        {edit ? 'Save Changes' : 'Create Task'}
      </PrimaryButton>
    </form>
  )
}

export default TaskForm
