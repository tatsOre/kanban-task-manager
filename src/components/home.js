import { Navigate } from 'react-router-dom'
import useUser from '../hooks/use-user'

const Home = () => {
  const user = useUser()

  return (
    <div>
      {user && user.boards.length ? (
        <Navigate to={`boards/${user.boards[0].id}`} replace />
      ) : (
        <Navigate to="boards" replace />
      )}
    </div>
  )
}

export default Home
