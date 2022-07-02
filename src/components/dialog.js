import { useRef } from 'react'
import useClickOutside from './hooks/use-click-outside'

function Dialog({ id, show, onClose, children }) {
  const me = useRef()
  useClickOutside(me, onClose)

  return (
    <div
      className="dialog-container"
      aria-labelledby={`${id}-dialog-title`}
      aria-modal="true"
      tabIndex="-1"
      role="dialog"
      aria-hidden={!show}>
      <div className="dialog-overlay"></div>
      <div ref={me} id="dialog" className="dialog-content" role="document">
        {children}
      </div>
    </div>
  )
}

export default Dialog
