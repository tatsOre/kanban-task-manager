import CheckboxInput from '..'
import { InputAppearances } from '../../shared/types/appearance'

export default {
  title: 'Forms/CheckboxInput',
  component: CheckboxInput,
  args: {
    inputLabel: 'Checkbox Label Text'
  }
}

const Template = (args) => <CheckboxInput {...args} />

export const StandardHiddenLabel = Template.bind({})
StandardHiddenLabel.args = {
  showInputLabel: false
}

export const StandardWithLabel = Template.bind({})

export const CheckboxFilledLabel = Template.bind({})
CheckboxFilledLabel.args = {
  className: 'subtask-input',
  inputLabel: 'Checkbox Input for Subtask Details Dialog'
}

export const ErrorCheckboxInput = Template.bind({})
ErrorCheckboxInput.args = {
  appearance: InputAppearances.Error,
  errors: 'Error message here'
}

export const SuccessCheckboxInput = Template.bind({})
SuccessCheckboxInput.args = {
  appearance: InputAppearances.Success
}

export const StandardWithHintContent = Template.bind({})
StandardWithHintContent.args = {
  hintContent:
    'This is a help text which may provide helpful tips, special instructions or advice.'
}

export const CheckboxDisabled = Template.bind({})
CheckboxDisabled.args = {
  disabled: true
}

export const CheckboxWithCustomLabel = Template.bind({})
CheckboxWithCustomLabel.args = {
  inputLabel: (
    <p>
      Example that includes <code>HTML</code> tags.
      <small style={{ fontWeight: 'normal' }}>
        <code> small</code> element with text.
      </small>
    </p>
  )
}
