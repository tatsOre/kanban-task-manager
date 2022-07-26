import { AddTaskButton, Button } from './components/button'
import { ThemeProvider } from './components/context/theme'

import Dialog from './components/dialog'

import { useState } from 'react'

import ViewTask from './components/view-task'

import data from './data/data.json'

import { BoardTaskItem } from './components/board-details'
import Layout from './components/layout'

const BOARDS_SAMPLE = data.boards

const TASK_SAMPLE = data.boards[0].columns[1].tasks[5]

function App() {
  const [show, setShow] = useState(BOARDS_SAMPLE[0].name)
  /* For UI Prototypes */

  const [activeBoard, setActiveBoard] = useState(BOARDS_SAMPLE[0])

  const [showTask, setShowTask] = useState(false)

  return (
    <ThemeProvider>
      <Layout>
        <div className="board-toolbar">
          <h2>{activeBoard.name}</h2>
          <AddTaskButton />
        </div>

        <section className="board-details">
          {activeBoard.columns.length ? (
            <>
              {activeBoard.columns.map((column) => (
                <section className="board-column">
                  <h3 className="heading-s">
                    {column.name} ({column.tasks.length})
                  </h3>
                  <ul className="column-tasks">
                    {column.tasks.length
                      ? column.tasks.map((task) => (
                          <BoardTaskItem
                            data={task}
                            onClick={() => setShowTask(true)}
                          />
                        ))
                      : null}
                  </ul>
                </section>
              ))}

              <section className="new-column">
                <button className="heading-xl" type="button">
                  + New Column
                </button>
              </section>
            </>
          ) : (
            <>
              <p>This board is empty. Create a new column to get started.</p>
              <Button size="large">+ Add New Column</Button>
            </>
          )}

          {showTask && (
            <Dialog onClose={() => setShowTask(false)}>
              <ViewTask data={TASK_SAMPLE} />
            </Dialog>
          )}
        </section>
      </Layout>
    </ThemeProvider>
  )
}

export default App
