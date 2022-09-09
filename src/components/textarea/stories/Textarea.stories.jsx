import Textarea from '..'

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
