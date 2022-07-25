import { useTheme } from './context/theme'

import BoardForm from './form-board'
import Logo from './logotype'
import ThemeToggle from './theme-toggle'
import Dialog from './dialog'

/* For UI implementation */
import data from '../data/data.json'
import { useState } from 'react'
const BOARDS_SAMPLE = data.boards

function DashboardLayout({ children }) {
  const [showDialog, setShowDialog] = useState(false)
  const [theme] = useTheme()

  return (
    <div data-theme={theme} className="kanban-container">
      <header className="kanban-header">
        <Logo />
      </header>

      <aside className="kanban-sidebar">
        <nav className="board-tabs">
          <h2 className="heading-s">
            ALL BOARDS ({BOARDS_SAMPLE.length})
          </h2>

          <ul>
            {BOARDS_SAMPLE.map((board) => (
              <li key={board.name}>
                <a href="/">{board.name}</a>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => setShowDialog(true)} className="create-board__button">
            + Create New Board
          </button>
        </nav>

        <ThemeToggle />

        <button>Hide Sidebar</button>
      </aside>

      {children}

      {showDialog ? (
        <Dialog
          id="board"
          show={showDialog}
          onClose={() => setShowDialog(false)}>
          <BoardForm
            initialValues={{
              name: '',
              columns: [{ name: 'Todo' }, { name: 'Doing' }]
            }}
            edit={false}
          />
        </Dialog>
      ) : null}
    </div>
  )
}

export default DashboardLayout
