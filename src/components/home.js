import { Navigate } from 'react-router-dom'

const Home = () => {
  const user = {
    boards: [
      {
        name: 'Board',
        id: 1,
        columns: []
      }
    ]
  }

  return (
    <div>
      {user && user.boards.length ? (
        <Navigate to={`boards/${1}`} replace />
      ) : (
        <Navigate to="boards" replace />
      )}
    </div>
  )
}

export default Home
