import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import useLocalStorage, { getUserBoards } from '../hooks/use-storage'
import DeleteAlertDialog from './delete-alert-dialog'
import Modal from './dialog-modal'
import TaskForm from '../components/task-form'
import TaskView from '../components/view-task'
import { TASK_SCHEMA } from '../utils/constants'

function CreateTaskModal() {
  const navigate = useNavigate()

  const [, dispatch] = useAppData()

  const { createTask } = useLocalStorage()

  const handleCreate = (body) => {
    const [newBoard, updatedBoards] = createTask(body)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards(updatedBoards) })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    navigate(`/boards/${body.boardId}`)
  }

  return (
    <Modal>
      <TaskForm initialValues={TASK_SCHEMA} onSubmit={handleCreate} />
    </Modal>
  )
}

function DeleteTask() {
  const [state, dispatch] = useAppData()

  const navigate = useNavigate()

  const { deleteTask } = useLocalStorage()

  const handleDelete = () => {
    const [newBoard, updatedBoards] = deleteTask(state.ACTIVE_TASK)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards(updatedBoards) })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    dispatch({ type: 'OPEN_DELETE_TASK', payload: false })

    navigate(`/boards/${newBoard.id}`)
  }

  const closeDialog = () => {
    dispatch({ type: 'OPEN_DELETE_TASK', payload: false })
    navigate(`/boards/${state.ACTIVE_TASK.boardId}`)
  }

  return (
    <DeleteAlertDialog
      task={state.ACTIVE_TASK}
      onClose={closeDialog}
      theme={state.THEME}
      onDelete={handleDelete}
    />
  )
}

function EditTaskModal() {
  const navigate = useNavigate()

  const [state, dispatch] = useAppData()

  const { updateTask } = useLocalStorage()

  const handleEdit = (body) => {
    const [newBoard, updatedBoards] = updateTask(body)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards(updatedBoards) })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    navigate(`/boards/${body.boardId}`)
  }

  return (
    <Modal>
      <TaskForm initialValues={state.ACTIVE_TASK} onSubmit={handleEdit} edit />
    </Modal>
  )
}

function ViewTaskModal() {
  const [state, dispatch] = useAppData()

  const { taskId } = useParams()

  function getTaskById(id, board) {
    for (let column of board.columns) {
      const task = column.tasks.find((t) => t.id == id)
      if (task) {
        return dispatch({ type: 'SET_ACTIVE_TASK', payload: task })
      }
    }
  }

  useEffect(() => {
    getTaskById(taskId, state.ACTIVE_BOARD)
  }, [taskId])

  return (
    <Modal>
      {state.ACTIVE_TASK ? (
        <TaskView task={state.ACTIVE_TASK} board={state.ACTIVE_BOARD.id} />
      ) : (
        <p>Something went wrong.</p>
      )}
    </Modal>
  )
}

export { CreateTaskModal, DeleteTask, EditTaskModal, ViewTaskModal }
