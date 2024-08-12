import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function TasksPage() {
  const taskInput = useRef()
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const [tasks, setTasks] = useState([])

  const getData = () => {
    axios
      .get('https://shop.easetasks.com/index.php/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err) {
          setTasks(res.data.data)
          console.log(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err.data)
      })
  }

  const addNewTask = () => {
    event.preventDefault()
    let data = {
      task_name: taskInput.current.value,
    }
    axios
      .post('https://shop.easetasks.com/index.php/api/tasks/store', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Task has been Added',
            showConfirmButton: false,
            timer: 1500,
          })
          getData()
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'there is a mistake',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
      .catch(() => {})
  }

  const changeTaskStatus = (task_id) => {
    let check = event.target.checked
    let isDone = {
      is_done: check,
      task_id: task_id,
    }
    axios
      .post('https://shop.easetasks.com/index.php/api/tasks/update', isDone, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getData()
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <h1>Welcome back Mr: {user}</h1>
      <form onSubmit={addNewTask}>
        <input
          ref={taskInput}
          type="text"
          placeholder="Enter new task name"
        />
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>-</th>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Is Done</th>
            <th>Created At</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((el, index) => (
            <tr key={el.task_id}>
              <td>{index + 1}</td>
              <td>{el.task_id}</td>
              <td>{el.task_name}</td>
              <td>
                <input
                  onChange={() => {
                    changeTaskStatus(el.task_id)
                  }}
                  defaultChecked={el.is_done}
                  type="checkbox"
                />
              </td>
              <td>{el.created_at}</td>
              <td>{el.last_update}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
