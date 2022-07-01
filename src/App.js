import { Button } from './components/button'
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
        <h1 className="heading-xl">Kanban XL</h1>

        <h1 className="heading-l">Kanban L</h1>
        <h1 className="heading-m">Kanban M</h1>
        <h1 className="heading-s">Kanban S</h1>
        <p className="body-l">
          Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
          Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel,
          nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget
          blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas,
          ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.
          Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.
        </p>
        <p className="body-m">
          Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
          Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel,
          nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget
          blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas,
          ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.
          Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.
        </p>
      </div>
      <Button>Button Primary Small</Button>
      <Button size="large">Button Primary Large</Button>
      <Button variant='secondary'>Button Secondary</Button>
      <Button variant='danger'>Button Secondary</Button>
      <div>
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
