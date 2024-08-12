import { useContext } from 'react'
import TasksPage from '../../component/TasksPage'
import { UserContext } from '../../component/context'

export default function HomePage() {
  const {user,setUser} = useContext(UserContext)
  return <TasksPage />
}
