import { StandardButton } from '../button'
import TextInput from '../textInput'
import { InputAppearances } from '../shared/types/appearance'

function FieldList(props) {
  const { data, errors, onChange, onRemoveItem } = props

  return Array.isArray(data) && data.length ? (
    <ul aria-labelledby="columns-list" className="input-list">
      {columns.map(({ name }, index) => {
        const hasError =
          errors &&
          errors.columns &&
          errors.columns[index] &&
          !data.columns[index].name

        return (
          <li key={`column-${index}`}>
            <TextInput
              appearance={hasError && InputAppearances.Error}
              className="input-group"
              errors={hasError && errors.columns[index]}
              inputLabel="column name"
              showInputLabel={false}
              onChange={(e) => onChange(e, index)}
              value={name}
            />

            <StandardButton
              className="close-button"
              onClick={() => onRemoveItem(index)}
              iconStart="close"
            />
          </li>
        )
      })}
    </ul>
  ) : null
}

export default FieldList
