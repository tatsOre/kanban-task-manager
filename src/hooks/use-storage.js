import uuid from 'react-uuid'
import { BOARDS_KEY } from '../utils/constants'

export const getUserBoards = (arr) =>
  arr.map((b) => ({ id: b.id, name: b.name }))

function useLocalStorage() {
  const store = (() => {
    if (window !== undefined) {
      const boards = window.sessionStorage.getItem(BOARDS_KEY)
      if (boards) return JSON.parse(boards)
    }
    return []
  })()

  const setBoards = (boards) => {
    if (window !== undefined)
      window.sessionStorage.setItem(BOARDS_KEY, JSON.stringify(boards))
  }

  const getBoardIndex = (boardId) => {
    return store.findIndex((b) => b.id === boardId)
  }

  const updateStoreAtIndex = (index, data) => [
    ...store.slice(0, index),
    data,
    ...store.slice(index + 1)
  ]

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

    return [body, updatedBoards]
  }

  const deleteBoard = (boardId) => {
    const deletedIndex = getBoardIndex(boardId)

    const updatedBoards = [
      ...store.slice(0, deletedIndex),
      ...store.slice(deletedIndex + 1)
    ]

    setBoards(updatedBoards)

    return updatedBoards
  }

  const createTask = (task) => {
    const boardIndex = getBoardIndex(task.boardId)

    const newBoard = { ...store[boardIndex] }

    const columnIndex = newBoard.columns.findIndex(
      (c) => c.name.toLowerCase() == task.status.toLowerCase()
    )

    newBoard.columns[columnIndex].tasks.push({ id: uuid(), ...task })

    const updatedBoards = updateStoreAtIndex(boardIndex, newBoard)

    setBoards(updatedBoards)

    return [newBoard, updatedBoards]
  }

  const updateTask = (task) => {
    const boardIndex = getBoardIndex(task.boardId)

    const newBoard = { ...store[boardIndex] }

    const columnIndex = newBoard.columns.findIndex(
      (c) => c.name.toLowerCase() == task.status.toLowerCase()
    )

    newBoard.columns[columnIndex].tasks.forEach((t, idx) => {
      if (t.id == task.id) {
        newBoard.columns[columnIndex].tasks[idx] = task
      }
    })

    const updatedBoards = updateStoreAtIndex(boardIndex, newBoard)

    setBoards(updatedBoards)

    return [newBoard, updatedBoards]
  }

  const deleteTask = (task) => {
    const boardIndex = getBoardIndex(task.boardId)

    const newBoard = { ...store[boardIndex] }

    const columnIndex = newBoard.columns.findIndex(
      (c) => c.name.toLowerCase() == task.status.toLowerCase()
    )

    const updatedCol = newBoard.columns[columnIndex].tasks.filter(
      (t) => t.id != task.id
    )

    console.log(updatedCol)

    newBoard.columns[columnIndex].tasks = updatedCol

    const updatedBoards = updateStoreAtIndex(boardIndex, newBoard)

    setBoards(updatedBoards)

    return [newBoard, updatedBoards]
  }

  return {
    createBoard,
    createTask,
    updateBoard,
    updateTask,
    deleteBoard,
    deleteTask
  }
}

export default useLocalStorage
