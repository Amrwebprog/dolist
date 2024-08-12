import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function RegisterFourm() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const navigate = useNavigate()
  const passwordInput = useRef()
  const nameInput = useRef()
  const emailInput = useRef()
  useEffect(() => {
    token ? navigate('/') : null
  })
  const handleSubmit = () => {
    event.preventDefault()
    let data = {
      user_name: nameInput.current.value,
      user_email: emailInput.current.value,
      user_password: passwordInput.current.value,
    }
    axios
      .post('https://shop.easetasks.com/index.php/api/users/store', data)
      .then((res) => {
        console.log(res.data)
        if (res.data.err) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Email is already exist',
            timer: '1500',
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Congratolation',
            text: 'You Have Account now and you can login',
            timer: '1500',
          })
          navigate('/login')
        }
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
  return (
    <div className="col-12 d-flex align-content-center justify-content-center">
      <form
        className="col-6"
        onSubmit={handleSubmit}
      >
        <input
          ref={emailInput}
          type="text"
          placeholder="enter your username "
        />
        <input
          ref={passwordInput}
          type="password"
          placeholder="enter your Password "
        />
        <input
          ref={nameInput}
          type="email"
          placeholder="enter your Email "
        />
        <button>Register</button>
      </form>
    </div>
  )
}
