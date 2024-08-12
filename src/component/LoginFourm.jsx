import axios from 'axios'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from './context'

export default function LoginFourm() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const emailInput = useRef()
  const passInput = useRef()
  const { user, setUser } = useContext(UserContext)

  const handleLogin = () => {
    event.preventDefault()
    const data = {
      user_password: passInput.current.value,
      user_email: emailInput.current.value,
    }
    axios
      .post('https://shop.easetasks.com/index.php/api/users/auth', data)
      .then((res) => {
        const Login = res.data.err
        if (!Login) {
          const token = res.data.data[0].user_token
          const username = res.data.data[0].user_name
          localStorage.setItem('token', token)
          localStorage.setItem('user', username)
          Swal.fire({
            icon: 'success',
            title: 'Congratolation',
            text: 'You Have been logged in',
            timer: '1500',
          })

          setUser(res.data.data)

          navigate('/')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your Email or Password is wrong',
            timer: '1500',
          })
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error 404',
          timer: '1500',
        })
      })
  }
  useEffect(() => {
    token ? navigate('/') : null
  })
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          ref={emailInput}
          type="Email"
          placeholder="Enter your email"
        />
        <input
          ref={passInput}
          type="password"
          placeholder="Enter your password"
        />
        <button>Login</button>
      </form>
    </>
  )
}
