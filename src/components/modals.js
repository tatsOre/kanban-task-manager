import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import { useAppData } from '../context/app-data'
import { FormSubmission } from '../hooks/use-form-submission'
import ViewTask from './view-task'
import BoardForm from './board-form'

const CreateBoardModal = () => {
  const navigate = useNavigate()

  function onDismiss() {
    navigate(-1)
  }

  return (
    <Dialog aria-labelledby="dialog-label" onDismiss={onDismiss}>
      <FormSubmission method="POST" endpoint="" callback={() => {}}>
        <BoardForm
          initialValues={{
            name: '',
            columns: [{ name: 'Todo' }, { name: 'Doing' }]
          }}
        />
      </FormSubmission>
    </Dialog>
  )
}

const EditBoardModal = () => {
  const navigate = useNavigate()
  const [state] = useAppData()

  function onDismiss() {
    navigate(-1)
  }

  return (
    <Dialog aria-labelledby="dialog-label" onDismiss={onDismiss}>
      <FormSubmission method="PUT" endpoint={''} callback={() => {}}>
        <BoardForm initialValues={state.ACTIVE_BOARD} edit />
      </FormSubmission>
    </Dialog>
  )
}

function getTaskById(id, board) {
  for (let column of board.columns) {
    const task = column.tasks.find((t) => t.id == id)
    if (task) return task
  }
}

const ViewTaskModal = () => {
  const [state] = useAppData()
  const { taskId } = useParams()
  const navigate = useNavigate()

  const task = getTaskById(taskId, state.ACTIVE_BOARD)

  function onDismiss() {
    navigate(-1)
  }

  //navigate(`/boards/${state.ACTIVE_TASK.boardId}`)

  return (
    <Dialog aria-labelledby="dialog-label" onDismiss={onDismiss}>
      {task ? <ViewTask task={task} /> : <p>Something went wrong.</p>}
    </Dialog>
  )
}

export { CreateBoardModal, EditBoardModal, ViewTaskModal }
