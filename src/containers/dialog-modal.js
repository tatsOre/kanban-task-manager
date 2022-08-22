import { useNavigate } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import { useAppData } from '../context/app-data'

export const ModalHeading = ({ children, tag, ...props }) => (
  <h2 id="dialog-label" className="dialog-heading" {...props}>
    {children}
  </h2>
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
