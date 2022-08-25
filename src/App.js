import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppDataProvider } from './context/app-data'
import BoardManager from './containers/boards-manager'
import Board, { BoardsHome } from './components/board'
import { CreateBoardModal, EditBoardModal } from './containers/board-actions'
import {
  CreateTaskModal,
  EditTaskModal,
  ViewTaskModal
} from './containers/task-actions'
import Home from './components/home'

export default function App() {
  const location = useLocation()
  let state = location.state

  useEffect(() => {
    document.title = 'Kanban Task Manager ⚡️'
  }, [])

  return (
    <AppDataProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="boards" element={<BoardManager />}>
            <Route index element={<BoardsHome />} />
            <Route path=":boardId" element={<Board />} />
          </Route>
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/boards/new" element={<CreateBoardModal />} />
          <Route path="/boards/:boardId/edit" element={<EditBoardModal />} />
          <Route
            path="/boards/:boardId/new-task"
            element={<CreateTaskModal />}
          />
          <Route
            path="/boards/:boardId/tasks/:taskId"
            element={<ViewTaskModal />}
          />
          <Route
            path="/boards/:boardId/edit/:taskId"
            element={<EditTaskModal />}
          />
        </Routes>
      )}
    </AppDataProvider>
  )
}
