import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import { UserProvider } from './component/context'

export default function App() {
  return (
    <>
      <div className="col-12 bg-dark text-white">App</div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/">
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path="login"
                element={<LoginPage></LoginPage>}
              ></Route>
              <Route
                path="register"
                element={<RegisterPage></RegisterPage>}
              ></Route>
              <Route
                path="*"
                element={<h1>error 404</h1>}
              ></Route>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}
