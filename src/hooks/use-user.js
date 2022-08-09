import json from '../data/data.json'

function useUser() {
  return {
    name: 'user',
    boards: json.boards.map((board) => ({ id: board.id, name: board.name }))
  }
}

export default useUser
