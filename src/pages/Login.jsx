import React, { useContext } from "react"
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"
import { AuthContext } from "../context"

const Login = () => {
  const { setIsAuth } = useContext(AuthContext)

  const login = e => {
    e.preventDefault()
    setIsAuth(true)
    localStorage.setItem("auth", "true")
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите имя" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login
