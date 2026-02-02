import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface User {
  id: number
  username: string
  role: string
}

const AuthGuard: React.FC = () => {
  // 从本地存储获取用户信息
  const userStr = localStorage.getItem('user')
  let user: User | null = null
  
  try {
    // 尝试解析用户信息，避免JSON解析错误导致空白页
    if (userStr) {
      user = JSON.parse(userStr)
    }
  } catch (error) {
    console.error('Failed to parse user info from localStorage:', error)
    // 解析错误时，清除本地存储中的用户信息
    localStorage.removeItem('user')
    user = null
  }

  // 如果用户未登录或用户信息不完整，重定向到登录页面
  if (!user || !user.id || !user.username || !user.role) {
    return <Navigate to="/login" />
  }

  // 如果用户已登录，允许访问受保护的路由
  return <Outlet />
}

export default AuthGuard