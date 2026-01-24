import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from "../context/authContext"

export default function ProtectedRoute() {
  const { user, loading } = UserAuth()

  // Show nothing while checking authentication status
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(79, 70, 229, 0.3)',
          borderTop: '4px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
      </div>
    )
  }

  // Not authenticated - redirect to sign in
  if (!user) {
    return <Navigate to="/" replace />
  }

  // Authenticated but email not verified - redirect to verification page
  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  // Authenticated and email verified - allow access
  return <Outlet />
}
