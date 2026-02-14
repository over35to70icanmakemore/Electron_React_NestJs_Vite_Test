import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface User {
  id: string
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  gender: number
  status: number
  roles: string[]
  roleNames: string[]
}

const AuthGuard: React.FC = () => {
  const userStr = localStorage.getItem('user')
  let user: User | null = null

  try {
    if (userStr) {
      user = JSON.parse(userStr)
    }
  }
  catch (error) {
    console.error('Failed to parse user info from localStorage:', error)
    localStorage.removeItem('user')
    user = null
  }

  if (!user || !user.id || !user.username) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default AuthGuard
