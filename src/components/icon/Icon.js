import { cx } from '../utils'
import {
  IconCross,
  IconBoard,
  IconChevron,
  IconEyeOpen,
  IconEyeClosed
} from './src'

const IconShapes = {
  close: IconCross,
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
