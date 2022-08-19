import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppDataProvider, useAppData } from './context/app-data'
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

const BoardsHome = () => {
  const [state] = useAppData()
 
  return (
    <>
      <div className="board-toolbar empty"></div>
      <section className="board-details empty">
        {state.USER_BOARDS.length ? (
          <p>Hey! Choose one of the boards on the left to get started.</p>
        ) : (
          <p>Your dashboard is empty. Create a new board to get started.</p>
        )}
      </section>
    </>
  )
}

export default function App() {
  const location = useLocation()
  let state = location.state

  useEffect(() => {
    document.title = 'Kanban Task Manager'
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
