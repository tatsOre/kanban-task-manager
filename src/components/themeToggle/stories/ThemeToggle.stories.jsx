import { within, userEvent } from '@storybook/testing-library'
import { AppDataProvider } from '../../../context/app-data'
import ThemeToggle from '..'

export default {
  title: 'Components/Theme Toggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <AppDataProvider>
        <Story />
      </AppDataProvider>
    )
  ],
  args: {}
}

const Template = (args) => <ThemeToggle {...args} />

export const ThemeToggleStandard = Template.bind({})
ThemeToggleStandard.args = {}
ThemeToggleStandard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const toggleInput = await canvas.getByRole('checkbox')
  await userEvent.click(toggleInput)
}
