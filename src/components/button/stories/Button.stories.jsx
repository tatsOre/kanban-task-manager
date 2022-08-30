import { IconShapes } from '../../icon/Icon'
import ButtonBase, {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
  StandardButton
} from '../components/Button'

const IconOptions = Object.keys(IconShapes)

export default {
  title: 'Actions/Button',
  component: ButtonBase,
  subComponents: {
    PrimaryButton,
    DangerButton,
    SecondaryButton,
    StandardButton
  },
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    },
    iconStart: {
      options: IconOptions,
      control: { type: 'select' }
    }
  },
  args: {
    children: 'Button Text'
  }
}

const Template = (args) => (
  <StandardButton {...args}>{args.children}</StandardButton>
)

export const Standard = Template.bind({})

export const _PrimaryButton = (args) => (
  <PrimaryButton {...args}>{args.children}</PrimaryButton>
)

export const _SecondaryButton = (args) => (
  <SecondaryButton {...args}>{args.children}</SecondaryButton>
)

export const _DangerButton = (args) => (
  <DangerButton {...args}>{args.children}</DangerButton>
)

export const WithIconBeforeText = (args) => (
  <StandardButton {...args} iconStart="check">
    Button Text
  </StandardButton>
)

export const WithIconAfterText = (args) => (
  <StandardButton {...args} iconEnd="check">
    Button Text
  </StandardButton>
)

export const IconOnly = Template.bind({})
IconOnly.args = {
  iconStart: 'check',
  ariaLabel: 'check',
  children: ''
}

export const LargeButton = Template.bind({})
LargeButton.args = {
  children: 'Large Button',
  size: 'large'
}

export const LargeWithIconButton = Template.bind({})
LargeWithIconButton.args = {
  children: 'Large Button',
  iconStart: 'eye-open',
  size: 'large'
}
