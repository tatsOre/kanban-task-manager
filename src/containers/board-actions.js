import { useNavigate } from 'react-router-dom'
import { useAppData } from '../context/app-data'
import useLocalStorage, { getUserBoards } from '../hooks/use-storage'
import BoardForm from '../components/board-form'
import DeleteAlertDialog from './delete-alert-dialog'
import Modal from './dialog-modal'
import { BOARD_SCHEMA } from '../utils/constants'

function CreateBoardModal() {
  const navigate = useNavigate()

  const [, dispatch] = useAppData()

  const { createBoard } = useLocalStorage()

  const handleCreate = (body) => {
    const board = createBoard(body)

    dispatch({ type: 'SET_NEW_BOARD', payload: board })

    navigate(`/boards/${board.id}`)
  }

  return (
    <Modal>
      <BoardForm initialValues={BOARD_SCHEMA} onSubmit={handleCreate} />
    </Modal>
  )
}

function DeleteBoard() {
  const [state, dispatch] = useAppData()

  const navigate = useNavigate()

  const { deleteBoard } = useLocalStorage()

  const handleDelete = () => {
    const updatedBoards = deleteBoard(state.ACTIVE_BOARD.id)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards(updatedBoards) })

    dispatch({ type: 'OPEN_DELETE_BOARD', payload: false })

    navigate('/')
  }

  const closeDialog = () =>
    dispatch({ type: 'OPEN_DELETE_BOARD', payload: false })

  return (
    <DeleteAlertDialog
      board={state.ACTIVE_BOARD}
      theme={state.THEME}
      onClose={closeDialog}
      onDelete={handleDelete}
    />
  )
}

function EditBoardModal() {
  const navigate = useNavigate()

  const [state, dispatch] = useAppData()

  const { updateBoard } = useLocalStorage()

  const handleEdit = (body) => {
    const [newBoard, updatedBoards] = updateBoard(body)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards(updatedBoards) })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    navigate(`/boards/${newBoard.id}`)
  }

  return (
    <Modal>
      <BoardForm
        initialValues={state.ACTIVE_BOARD}
        onSubmit={handleEdit}
        edit
      />
    </Modal>
  )
}

export { CreateBoardModal, DeleteBoard, EditBoardModal }
