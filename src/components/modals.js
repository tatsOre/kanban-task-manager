import { cloneElement, useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription
} from '@reach/alert-dialog'
import uuid from 'react-uuid'
import { useAppData } from '../context/app-data'
import ViewTask from './view-task'
import BoardForm from './board-form'
import TaskForm from './task-form'
import { Button } from './button'
import { BOARDS_KEY, BOARD_SCHEMA, TASK_SCHEMA } from '../utils/constants'

function useLocalStorage() {
  const store = (() => {
    if (window !== undefined) {
      const boards = window.sessionStorage.getItem(BOARDS_KEY)
      if (boards) return JSON.parse(boards)
    }
    return []
  })()

  const getUserBoards = () => store.map((b) => ({ id: b.id, name: b.name }))

  const setBoards = (boards) => {
    if (window !== undefined)
      window.sessionStorage.setItem(BOARDS_KEY, JSON.stringify(boards))
  }

  const getBoardIndex = (boardId) => {
    return store.findIndex((b) => b.id === boardId)
  }

  const createBoard = (body) => {
    const id = uuid()

    const updatedBoards = [...store, { id, ...body }]

    setBoards(updatedBoards)

    return { id, ...body }
  }

  const updateBoard = (body) => {
    const updatedIndex = getBoardIndex(body.id)

    const updatedBoards = [
      ...store.slice(0, updatedIndex),
      body,
      ...store.slice(updatedIndex + 1)
    ]

    setBoards(updatedBoards)

    return body
  }

  const deleteBoard = (boardId) => {
    const deletedIndex = getBoardIndex(boardId)

    const updatedBoards = [
      ...store.slice(0, deletedIndex),
      ...store.slice(deletedIndex + 1)
    ]

    setBoards(updatedBoards)
  }

  const updateStoreAtIndex = (index, data) => [
    ...store.slice(0, index),
    data,
    ...store.slice(index + 1)
  ]

  const createTask = (task) => {
    const boardIndex = getBoardIndex(task.boardId)

    const newBoard = { ...store[boardIndex] } // TODO: change to deep copy

    const columnIndex = newBoard.columns.findIndex(
      (c) => c.name.toLowerCase() == task.status.toLowerCase()
    )

    newBoard.columns[columnIndex].tasks.push({ id: uuid(), ...task })

    const updatedBoards = updateStoreAtIndex(boardIndex, newBoard)

    setBoards(updatedBoards)

    return newBoard
  }

  return {
    createBoard,
    createTask,
    updateBoard,
    deleteBoard,
    getUserBoards
  }
}

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

  const { createBoard } = useLocalStorage()

  const handleCreate = (body) => {
    const board = createBoard(body)

    dispatch({ type: 'SET_NEW_BOARD', payload: board })

    navigate(`/boards/${board.id}`)
  }

  return (
    <DialogContainer>
      <BoardForm initialValues={BOARD_SCHEMA} onSubmit={handleCreate} />
    </DialogContainer>
  )
}

const EditBoardModal = () => {
  const navigate = useNavigate()

  const [state, dispatch] = useAppData()

  const { updateBoard, getUserBoards } = useLocalStorage()

  const handleEdit = (body) => {
    const newBoard = updateBoard(body)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards() })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    navigate(`/boards/${newBoard.id}`)
  }

  return (
    <DialogContainer>
      <BoardForm
        initialValues={state.ACTIVE_BOARD}
        onSubmit={handleEdit}
        edit
      />
    </DialogContainer>
  )
}

const ViewTaskModal = () => {
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
  const navigate = useNavigate()

  const [, dispatch] = useAppData()

  const { createTask, getUserBoards } = useLocalStorage()

  const handleCreate = (body) => {
    const newBoard = createTask(body)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards() })

    dispatch({ type: 'SET_ACTIVE_BOARD', payload: newBoard })

    navigate(`/boards/${body.boardId}`)
  }

  return (
    <DialogContainer>
      <TaskForm initialValues={TASK_SCHEMA} onSubmit={handleCreate} />
    </DialogContainer>
  )
}

const EditTaskModal = () => {
  const [state] = useAppData()

  const task = state.ACTIVE_TASK

  return (
    <DialogContainer>
      <TaskForm initialValues={task} onSubmit={() => {}} edit />
    </DialogContainer>
  )
}

const DeleteAlertDialog = ({ board, task, onClose, onDelete, theme }) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      className="alert-dialog"
      data-theme={theme}>
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
            <Button onClick={onDelete} variant="danger">
              Delete
            </Button>
            <Button ref={cancelRef} onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <AlertDialogDescription>
            Something went wrong, try later.
          </AlertDialogDescription>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </>
      )}
    </AlertDialog>
  )
}

const DeleteBoard = () => {
  const [state, dispatch] = useAppData()

  const navigate = useNavigate()

  const { deleteBoard, getUserBoards } = useLocalStorage()

  const handleDelete = () => {
    deleteBoard(state.ACTIVE_BOARD.id)

    dispatch({ type: 'UPDATE_BOARDS', payload: getUserBoards() })

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

const DeleteTask = () => {
  const [state, dispatch] = useAppData()
  const navigate = useNavigate()

  const closeDialog = () => {
    dispatch({ type: 'OPEN_DELETE_TASK', payload: false })
    navigate(`/boards/${state.ACTIVE_TASK.boardId}`)
  }

  return (
    <DeleteAlertDialog
      task={state.ACTIVE_TASK}
      onClose={closeDialog}
      theme={state.THEME}
    />
  )
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
