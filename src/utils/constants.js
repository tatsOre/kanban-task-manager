const BOARD_SCHEMA = {
  name: '',
  columns: [{ name: 'Todo' }, { name: 'Doing' }]
}

const TASK_SCHEMA = {
  title: '',
  description: '',
  subtasks: []
}

export { BOARD_SCHEMA, TASK_SCHEMA }
