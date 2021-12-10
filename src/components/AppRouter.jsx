import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../router"
import { AuthContext } from "../context"
import MyLoader from "./UI/loader/MyLoader"

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <MyLoader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRouter
