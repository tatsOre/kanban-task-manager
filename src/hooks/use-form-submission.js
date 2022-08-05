import { cloneElement, useEffect, useReducer, useState } from 'react'

function fetchReducer(state, action) {
  switch (action.type) {
    case 'START':
      return { status: 'pending', response: null, error: null }
    case 'RESOLVE':
      return { status: 'resolved', response: action.responseData, error: null }
    case 'REJECT':
      return { status: 'rejected', response: null, error: action.responseError }

    default:
      return
  }
}

function useFormSubmission({ method, endpoint, data }) {
  const [state, dispatch] = useReducer(fetchReducer, {
    status: 'idle',
    response: null,
    error: null
  })

  const body = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (body) {
      dispatch({ type: 'START' })

      window
        .fetch(endpoint, {
          method,
          body,
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(async (response) => {
          const { data } = await response.json()

          if (response.ok) {
            dispatch({ type: 'RESOLVE', responseData: data })
          } else {
            dispatch({ type: 'REJECT', responseError: data })
          }
        })
        .catch((error) => {
          dispatch({ type: 'REJECT', responseError: error.message })
        })
    }
  }, [endpoint, body])

  return state
}

function FormSubmission({ method, endpoint, children }) {
  const [formData, setFormData] = useState(null)

  const { status, response, error } = useFormSubmission({
    method,
    endpoint,
    data: formData
  })

  if (status === 'resolved') return

  return (
    <>
      {status === 'pending' ? <p>Loading...</p> : null}

      {status === 'resolved' ? (
        <pre>{JSON.stringify(response, undefined, 2)}</pre>
      ) : null}

      {status === 'rejected' ? (
        <div role="alert" style={{ color: 'red' }}>
          {error}
        </div>
      ) : null}

      {cloneElement(children, { onSubmit: setFormData })}
    </>
  )
}

export { FormSubmission, useFormSubmission }
