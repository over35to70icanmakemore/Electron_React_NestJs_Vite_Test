import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import './UserManagement.css'

interface User {
  id: number
  username: string
  role: string
  email: string
  createdAt: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'admin', role: 'admin', email: 'admin@example.com', createdAt: '2026-01-01' },
    { id: 2, username: 'teacher', role: 'teacher', email: 'teacher@example.com', createdAt: '2026-01-02' },
    { id: 3, username: 'user', role: 'user', email: 'user@example.com', createdAt: '2026-01-03' }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'user',
    email: ''
  })

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user: User = {
      id: users.length + 1,
      username: newUser.username,
      role: newUser.role,
      email: newUser.email,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setUsers([...users, user])
    setIsAddModalOpen(false)
    setNewUser({ username: '', password: '', role: 'user', email: '' })
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="user-management-container">
      <div className="page-header">
        <h1>用户管理</h1>
        <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
          <PlusOutlined /> 添加用户
        </button>
      </div>

      <div className="user-list-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>角色</th>
              <th>邮箱</th>
              <th>创建日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? '管理员' : user.role === 'teacher' ? '教师' : '用户'}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action btn-edit" title="编辑">
                      <EditOutlined />
                    </button>
                    <button 
                      className="btn-action btn-delete" 
                      onClick={() => handleDeleteUser(user.id)}
                      title="删除"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>添加用户</h2>
              <button className="close-button" onClick={() => setIsAddModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="username">用户名：</label>
                <input
                  type="text"
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">密码：</label>
                <input
                  type="password"
                  id="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">角色：</label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="admin">管理员</option>
                  <option value="teacher">教师</option>
                  <option value="user">用户</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">邮箱：</label>
                <input
                  type="email"
                  id="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsAddModalOpen(false)}>
                  取消
                </button>
                <button type="submit" className="save-button">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement