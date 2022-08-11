const BOARD_SCHEMA = {
  name: '',
  columns: [{ name: 'Todo' }, { name: 'Doing' }]
}

const TASK_SCHEMA = {
  title: '',
  description: '',
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

const BOARDS_KEY = 'kanban-boards'

export { BOARDS_KEY, BOARD_SCHEMA, TASK_SCHEMA }
