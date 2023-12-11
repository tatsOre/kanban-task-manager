import { Navigate } from 'react-router-dom'
import { useAppData } from '../context/app-data'

const Home = () => {
  const [state] = useAppData()
  const userBoards = (state && state.USER_BOARDS) || []
  const userBoardPath = (userBoards.length && userBoards[0].id) || null

  return (
    <div>
      {userBoardPath ? (
        <Navigate to={`boards/${userBoardPath}`} replace />
      ) : (
        <Navigate to="boards" replace />
      )}
    </div>
  )
}

export default Home
