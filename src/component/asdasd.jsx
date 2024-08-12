import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TasksPage() {
  // استخدام useState بشكل صحيح
  const [tasks, setTasks] = useState([
    {
      task_id: 5,
      task_name: 'test 1 ',
      user_id: 1,
      is_done: 1,
      created_at: '2024-08-09 18:04:52',
      last_update: '2024-08-09 18:04:52',
    },
    {
      task_id: 6,
      task_name: 'test 1 ',
      user_id: 1,
      is_done: 0,
      created_at: '2024-08-09 18:04:52',
      last_update: '2024-08-09 18:04:52',
    },
    {
      task_id: 7,
      task_name: 'test 1 ',
      user_id: 1,
      is_done: 1,
      created_at: '2024-08-09 18:04:52',
      last_update: '2024-08-09 18:04:52',
    },
  ])

  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return (
    <>
      <h1>Welcome back Mr: {user}</h1>
      <input
        type="text"
        placeholder="Enter new task name"
      />

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>-</th>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Is Done</th>
            <th>Created At</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {console.log(tasks)}
          {tasks.map((el) => (
            <tr key={el.task_id}>
              <td>{el.task_id}</td>
              <td>{el.task_name}</td>
              <td>{el.is_done ? 'Yes' : 'No'}</td>
              <td>{el.created_at}</td>
              <td>{el.last_update}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
