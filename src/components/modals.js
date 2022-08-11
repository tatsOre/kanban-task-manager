import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription
} from '@reach/alert-dialog'
import { useAppData } from '../context/app-data'
import { FormSubmission } from '../hooks/use-form-submission'
import ViewTask from './view-task'
import BoardForm from './board-form'
import TaskForm from './task-form'
import { Button } from './button'
import { BOARDS_KEY, BOARD_SCHEMA } from '../utils/constants'

export const DialogHeading = ({ children }) => (
  <h2 id="dialog-label" className="heading-l">
    {children}
  </h2>
)

const DialogContainer = (props) => {
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

const CreateBoardModal = () => {
  const navigate = useNavigate()

  const [, dispatch] = useAppData()

  const handleCreateBoard = (body) => {
    const boards = JSON.parse(window.sessionStorage.getItem(BOARDS_KEY))

    const id = boards.length + 1

    const updatedBoards = [...boards, { id, ...body }]

    window.sessionStorage.setItem(BOARDS_KEY, JSON.stringify(updatedBoards))

    dispatch({ type: 'SET_NEW_BOARD', payload: { id, name: body.name } })

    navigate(`/boards/${id}`)
  }

  return (
    <DialogContainer>
      <BoardForm initialValues={BOARD_SCHEMA} onSubmit={handleCreateBoard} />
    </DialogContainer>
  )
}

const EditBoardModal = () => {
  const navigate = useNavigate()

  const [state, dispatch] = useAppData()

  const handleEditBoard = (body) => {
    const boards = JSON.parse(window.sessionStorage.getItem(BOARDS_KEY))

    const updatedIndex = boards.findIndex((b) => b.id == body.id)

    const updatedBoards = [
      ...boards.slice(0, updatedIndex),
      body,
      ...boards.slice(updatedIndex + 1)
    ]

    console.log(updatedBoards)

    window.sessionStorage.setItem(BOARDS_KEY, JSON.stringify(updatedBoards))

    const mappedBoards = updatedBoards.map((b) => ({ id: b.id, name: b.name }))

    dispatch({ type: 'UPDATE_BOARDS', payload: mappedBoards })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: body })

    navigate(`/boards/${body.id}`)
  }

  return (
    <DialogContainer>
      <BoardForm
        initialValues={state.ACTIVE_BOARD}
        onSubmit={handleEditBoard}
        edit
      />
    </DialogContainer>
  )
}

function getTaskById(id, board) {
  for (let column of board.columns) {
    const task = column.tasks.find((t) => t.id === id)
    if (task) return task
  }
}

const ViewTaskModal = () => {
  const [state, dispatch] = useAppData()
  const { taskId } = useParams()

  useEffect(() => {
    const task = getTaskById(parseInt(taskId), state.ACTIVE_BOARD)

    dispatch({ type: 'SET_ACTIVE_TASK', payload: task })
  }, [taskId])

  return (
    <DialogContainer>
      {state.ACTIVE_TASK ? (
        <ViewTask task={state.ACTIVE_TASK} board={state.ACTIVE_BOARD.id} />
      ) : (
        <p>Something went wrong.</p>
      )}
    </DialogContainer>
  )
}

const CreateTaskModal = () => {
  return (
    <DialogContainer>
      <TaskForm
        initialValues={{
          title: '',
          description: '',
          subtasks: [
            {
              title: '',
              isCompleted: false
            },
            {
              title: '',
              isCompleted: false
            }
          ]
        }}
        onSubmit={() => {}}
      />
    </DialogContainer>
  )
}

const EditTaskModal = () => {
  const [state] = useAppData()
  const { taskId } = useParams()
  const task = getTaskById(taskId, state.ACTIVE_BOARD)

  return (
    <DialogContainer>
      <TaskForm initialValues={task} onSubmit={() => {}} edit />
    </DialogContainer>
  )
}

const DeleteBoardModal = ({ board, task, close }) => {
  const [state] = useAppData()
  const cancelRef = useRef()

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      className="alert-dialog"
      data-theme={state.THEME}>
      {board || task ? (
        <>
          <AlertDialogLabel className="heading-l">
            Delete this {board ? 'board' : 'task'}?
          </AlertDialogLabel>
          <AlertDialogDescription className="body-l">
            Are you sure you want to delete the{' '}
            {board
              ? `'${board.name}' board`
              : `'${task.title}' task and its subtasks`}
            ? This action {board ? 'will remove all columns and tasks' : ''} and
            cannot be reversed.
          </AlertDialogDescription>

          <div className="alert-buttons">
            <Button onClick={() => {}} variant="danger">
              Delete
            </Button>
            <Button ref={cancelRef} onClick={close} variant="secondary">
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <AlertDialogDescription>
            Something went wrong, try later.
          </AlertDialogDescription>
          <Button onClick={close} variant="secondary">
            Close
          </Button>
        </>
      )}
    </AlertDialog>
  )
}

const DeleteBoard = () => {
  const [state, dispatch] = useAppData()
  const closeDialog = () =>
    dispatch({ type: 'OPEN_DELETE_BOARD', payload: false })

  return <DeleteBoardModal board={state.ACTIVE_BOARD} close={closeDialog} />
}

const DeleteTask = () => {
  const [state, dispatch] = useAppData()
  const navigate = useNavigate()

  const closeDialog = () => {
    dispatch({ type: 'OPEN_DELETE_TASK', payload: false })
    console.log(state.ACTIVE_TASK)
    console.log(
      `/boards/${state.ACTIVE_TASK.boardId}/tasks/${state.ACTIVE_TASK.id}`
    )
    navigate(
      `/boards/${state.ACTIVE_TASK.boardId}/tasks/${state.ACTIVE_TASK.id}`
    )
  }

  return <DeleteBoardModal task={state.ACTIVE_TASK} close={closeDialog} />
}

export {
  CreateBoardModal,
  DeleteBoard,
  DeleteTask,
  EditBoardModal,
  ViewTaskModal,
  CreateTaskModal,
  EditTaskModal
}
