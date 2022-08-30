import { cx } from '../utils'
import {
  IconCheck,
  IconCross,
  IconBoard,
  IconChevron,
  IconEyeOpen,
  IconEyeClosed,
  IconAddPlus
} from './src'

export const IconShapes = {
  'add-plus': IconAddPlus,
  check: IconCheck,
  cross: IconCross,
  board: IconBoard,
  'eye-open': IconEyeOpen,
  'eye-crossed': IconEyeClosed,
  chevron: IconChevron
}

const Icon = ({ className, name, ...props }) => {
  const Icon = IconShapes[name]
  return Icon ? (
    <span className={cx([className, 'icon-container'])} aria-hidden="true">
      <Icon {...props} />
    </span>
  ) : null
}

export default Icon
