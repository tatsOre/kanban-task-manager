import { useEffect } from 'react'

// Add keydown listener for key 27 [esc] to close modal

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const listener = ({ target }) => {
      if (!ref.current || ref.current.contains(target)) {
        return
      }
      callback()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}

export default useClickOutside
