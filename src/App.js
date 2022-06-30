import './App.css'
import { ThemeProvider } from './components/context/theme'

import BoardForm from './components/form-board'
import TaskSubmission from './components/form-task'
import { FormSubmission } from './components/hooks/use-form-submission'
import { POST_TASK } from './utils/routes'

const TASK_SCHEMA = {
  title: '',
  description: '',
  status: '',
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
}

const BOARD_SCHEMA = {
  name: '',
  columns: [{ name: 'Todo' }, { name: 'Doing' }]
}

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Kanban</h1>
        <TaskSubmission initialValues={TASK_SCHEMA} edit={false} />
      </div>
      <div>
        <FormSubmission method={'POST'} endpoint={POST_TASK} callback={() => {}}>
          <BoardForm initialValues={BOARD_SCHEMA} edit={false} />
        </FormSubmission>
      </div>
    </ThemeProvider>
  )
}

export default App
