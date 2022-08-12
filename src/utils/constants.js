const BOARD_SCHEMA = {
  name: '',
  columns: [{ name: 'Todo' }, { name: 'Doing' }]
}

const COLUMN_SCHEMA = { name: '', tasks: [] }

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

export { BOARDS_KEY, BOARD_SCHEMA, COLUMN_SCHEMA, TASK_SCHEMA }
