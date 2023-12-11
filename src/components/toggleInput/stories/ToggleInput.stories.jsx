import ToggleInput from '..'

export default {
  title: 'Forms/ToggleInput',
  component: ToggleInput,
  args: {
    inputLabel: 'Toggle Label'
  }
}

const Template = (args) => <ToggleInput {...args} />

export const StandardToggleInput = Template.bind({})
StandardToggleInput.args = {
  showInputLabel: false
}

export const StandardToggleInputWithLabel = Template.bind({})
StandardToggleInputWithLabel.args = {
  id: 'toggle-input',
}

export const DisabledToggleInput = Template.bind({})
DisabledToggleInput.args = {
  disabled: true
}

export const StandardToggleInputWithHintContent = Template.bind({})
StandardToggleInputWithHintContent.args = {
  id: 'toggle-input-hint',
  hintContent:
    'A long text with hint content about what is expected from this input. Curabitur luctus, ex nec eleifend lacinia, quam lacus cursus nulla, eget placerat lacus ligula vitae diam.'
}
