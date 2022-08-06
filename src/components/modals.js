import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import { useAppData } from '../context/app-data'
import { FormSubmission } from '../hooks/use-form-submission'
import ViewTask from './view-task'
import BoardForm from './board-form'

const DialogContainer = (props) => {
  const navigate = useNavigate()

  const [state] = useAppData()
  //navigate(`/boards/${state.ACTIVE_TASK.boardId}`)
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

const CreateBoardModal = () => {
  return (
    <DialogContainer>
      <FormSubmission method="POST" endpoint="" callback={() => {}}>
        <BoardForm
          initialValues={{
            name: '',
            columns: [{ name: 'Todo' }, { name: 'Doing' }]
          }}
        />
      </FormSubmission>
    </DialogContainer>
  )
}

const EditBoardModal = () => {
  const [state] = useAppData()

  return (
    <DialogContainer>
      <FormSubmission method="PUT" endpoint={''} callback={() => {}}>
        <BoardForm initialValues={state.ACTIVE_BOARD} edit />
      </FormSubmission>
    </DialogContainer>
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
  const task = getTaskById(taskId, state.ACTIVE_BOARD)

  return (
    <DialogContainer>
      {task ? <ViewTask task={task} /> : <p>Something went wrong.</p>}
    </DialogContainer>
  )
}

export { CreateBoardModal, EditBoardModal, ViewTaskModal }
