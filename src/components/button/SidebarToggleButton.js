import {
  ButtonAppearances,
  Size as ButtonSizes
} from '../shared/types/appearance'
import { StandardButton } from './index'
import './SidebarToggleButton.scss'

function SidebarToggleButton(props) {
  const { open, onClick } = props
  return (
    <StandardButton
      appearance={!open && ButtonAppearances.Primary}
      children={open && 'Hide Sidebar'}
      className={`toggle-sidebar ${open ? 'hide' : 'open'}`}
      iconStart={open ? 'eye-crossed' : 'eye-open'}
      onClick={onClick}
      size={ButtonSizes.Large}
    />
  )
}

export default SidebarToggleButton
