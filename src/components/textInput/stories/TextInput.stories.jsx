import TextInput from '..'
import { InputAppearances } from '../../shared/types/appearance'

export default {
  title: 'Forms/TextInput',
  component: TextInput,
  args: {
    id: 'text-input',
    inputLabel: 'Title',
    placeholder: 'e.g. Web Design'
  }
}

const Template = (args) => <TextInput {...args} />

export const StandardTextInput = Template.bind({})

export const RequiredTextInputWithHintContent = Template.bind({})
RequiredTextInputWithHintContent.args = {
  hintContent:
    'This is a help text which may provide helpful tips, special instructions or advice.',
  required: true
}

export const ErrorTextInput = Template.bind({})
ErrorTextInput.args = {
  appearance: InputAppearances.Error,
  errors: 'Error message here'
}

export const TextInputDisabled = Template.bind({})
TextInputDisabled.args = {
  disabled: true
}
