import SelectInput from '..'

export default {
  title: 'Forms/SelectInput',
  component: SelectInput,
  args: {
    inputLabel: 'Current Status',
    options: [
      { label: 'Todo', value: 'todo' },
      { label: 'Done', value: 'done' },
      { label: 'Next', value: 'next' }
    ],
  }
}

const Template = (args) => <SelectInput {...args} />

export const SelectInputStandard = Template.bind({})

export const SelectInputDisabled = Template.bind({})
SelectInputDisabled.args = {
  options: []
}
