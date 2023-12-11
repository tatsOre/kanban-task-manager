import Textarea from '..'
import { InputAppearances } from '../../shared/types/appearance'

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    inputLabel: 'Description',
    placeholder:
      "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.",
    rows: '6'
  }
}

const Template = (args) => <Textarea {...args} />

export const StandardTextarea = Template.bind({})

export const StandardWithHintContent = Template.bind({})
StandardWithHintContent.args = {
  hintContent:
    'This is a help text which may provide helpful tips, special instructions or advice.'
}

export const ErrorTextarea = Template.bind({})
ErrorTextarea.args = {
  appearance: InputAppearances.Error,
  errors: 'Error message here'
}

export const TextareaDisabled = Template.bind({})
TextareaDisabled.args = {
  disabled: true
}
