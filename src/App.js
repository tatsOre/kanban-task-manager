import { Button } from './components/button'
import { ThemeProvider } from './components/context/theme'

import { FormSubmission } from './components/hooks/use-form-submission'
import Dialog from './components/dialog'
import BoardForm from './components/form-board'
import TaskForm from './components/form-task'

import { POST_TASK } from './utils/routes'
import { useState } from 'react'
import DropdownSelect from './components/select'

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

const edit = false

const BoardActions = {
  data: {
    name: '',
    columns: [{ name: 'Todo' }, { name: 'Doing' }]
  },
  edit: false,
  method: edit ? 'PUT' : 'POST',
  endpoint: POST_TASK,
  callback: () => {}, // change server data state,
  show: true,
  onClose: () => {}
}
const dropdownProps = {
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Lemon', value: 'lemon' }
  ],
  selected: 'apple',
  onChange: () => {},
  label: 'Select your favorite fruit',
  disabled: false
}

function App() {
  const [show, setShow] = useState('')
  console.log(show)
  return (
    <ThemeProvider>
      <button onClick={() => setShow('board')}>open board</button>

      <button onClick={() => setShow('task')}>open task</button>

      {show === 'board' ? (
        <FormSubmission method="POST" endpoint={POST_TASK} callback={() => {}}>
          <Dialog
            id="board"
            show={show === 'board'}
            onClose={() => setShow('')}>
            <BoardForm initialValues={BoardActions.data} edit={false} />
          </Dialog>
        </FormSubmission>
      ) : null}

      {show === 'task' ? (
        <FormSubmission method="POST" endpoint={POST_TASK} callback={() => {}}>
          <Dialog id="task" show={show === 'task'} onClose={() => setShow('')}>
            <TaskForm initialValues={TASK_SCHEMA} edit={false} />
          </Dialog>
        </FormSubmission>
      ) : null}
    </ThemeProvider>
  )
}

export default App

/*


<h1 className="heading-xl">Kanban XL</h1>
      <DropdownSelect {...dropdownProps} />
        <p className="body-l">
          Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
          neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
          sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit
          nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
          egestas, ante et vulputate volutpat, eros pede semper est, vitae
          luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
          commodo quis, gravida id, est.
        </p>

        <Button variant="secondary">Button Secondary</Button>
        <Button variant="danger">Button Secondary</Button>

        <h2 className="heading-l">Kanban L</h2>
        <h3 className="heading-m">Kanban M</h3>
        <h4 className="heading-s">Kanban S</h4>
        
        <p className="body-m">
          Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
          neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
          sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit
          nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
          egestas, ante et vulputate volutpat, eros pede semper est, vitae
          luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
          commodo quis, gravida id, est.
        </p>
      <Button>Button Primary Small</Button>
      <Button size="large">Button Primary Large</Button>


      <div>

      </div>

*/
