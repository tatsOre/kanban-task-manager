import { Routes, Route, useLocation } from 'react-router-dom'
import { AppDataProvider } from './context/app-data'
import BoardManager from './components/boards-manager'
import Board from './components/board'
import Home from './components/home'
import {
  CreateBoardModal,
  CreateTaskModal,
  EditBoardModal,
  EditTaskModal,
  ViewTaskModal
} from './components/modals'

export default function App() {
  const location = useLocation()
  let state = location.state

  return (
    <AppDataProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="boards" element={<BoardManager />}>
            <Route path=":boardId" element={<Board />} />
          </Route>
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/boards/new" element={<CreateBoardModal />} />
          <Route path="/boards/edit/:boardId" element={<EditBoardModal />} />
          <Route path="/boards/tasks/new" element={<CreateTaskModal />} />
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
