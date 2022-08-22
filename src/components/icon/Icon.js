import { cx } from '../utils'
import { IconCross, IconBoard, IconEyeOpen, IconEyeClosed } from './src'


const IconStyles = {
  close: IconCross,
  board: IconBoard,
  'eye-open': IconEyeOpen,
  'eye-crossed': IconEyeClosed
}

const Icon = ({ className, name, ...props }) => {
  const Icon = IconStyles[name]
  return IconStyles[name] ? (
    <span className={cx([className, 'icon-container'])}>
      <Icon {...props} />
    </span>
  ) : null
}

export default Icon

