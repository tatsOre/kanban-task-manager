import { useNavigate } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import { useAppData } from '../context/app-data'
import { HeadingL } from '../components/heading'

export const ModalHeading = ({ children, tag, ...props }) => (
  <HeadingL id="dialog-label" tag="h2" {...props}>
    {children}
  </HeadingL>
)

function Modal(props) {
  const navigate = useNavigate()

  const [state] = useAppData()

  function onDismiss() {
    navigate(-1)
  }

  return (
    <Dialog
      aria-labelledby="dialog-label"
      onDismiss={onDismiss}
      data-theme={state.THEME}
      {...props}
    />
  )
}

export default Modal
