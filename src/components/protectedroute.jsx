import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from "../context/authContext"

export default function ProtectedRoute() {
  const { user } = UserAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return <Outlet />
}
