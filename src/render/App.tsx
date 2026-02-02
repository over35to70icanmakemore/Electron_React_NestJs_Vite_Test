import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Button, Tooltip, Layout, ConfigProvider } from 'antd'
import { industrialTheme } from './theme'
import './App.css'

// 导入页面组件
import Login from './pages/auth/Login'
import ExamManagement from './pages/exams/ExamManagement'
import StudentManagement from './pages/students/StudentManagement'
import QuestionManagement from './pages/questions/QuestionManagement'
import ScoreAnalysis from './pages/scores/ScoreAnalysis'
import Settings from './pages/settings/Settings'
import UserManagement from './pages/users/UserManagement'
import UserExamPage from './pages/user-exams/UserExamPage'

// 导入组件
import AuthGuard from './components/AuthGuard'

// 主应用内容组件
const AppContent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('user-exams')

  // 选项卡菜单项 - Office风格
  const tabItems = [
    {
      id: 'user-exams',
      label: '我的考试',
      icon: '📅',
      path: '/user-exams'
    },
    {
      id: 'exams',
      label: '考试管理',
      icon: '📋',
      path: '/exams'
    },
    {
      id: 'students',
      label: '考生管理',
      icon: '👥',
      path: '/students'
    },
    {
      id: 'questions',
      label: '试题库',
      icon: '📝',
      path: '/questions'
    },
    {
      id: 'scores',
      label: '成绩分析',
      icon: '📊',
      path: '/scores'
    },
    {
      id: 'users',
      label: '用户管理',
      icon: '👤',
      path: '/users'
    },
    {
      id: 'settings',
      label: '系统设置',
      icon: '⚙️',
      path: '/settings'
    }
  ]

  // 处理选项卡切换
  const handleTabClick = (path: string) => {
    // 从路径中提取标签ID
    const tabId = path.substring(1) // 移除开头的'/'
    setActiveTab(tabId)
    navigate(path)
  }

  // 处理根路径重定向
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/user-exams')
    }
  }, [location.pathname, navigate])

  const { Content, Footer } = Layout

  return (
    <Layout className="desktop-app-container">
      {/* Ant Design 选项卡菜单栏 */}
      <div className="ant-tabs-container">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => handleTabClick(`/${key}`)}
          className="industrial-tabs"
          size="large"
          style={{
            backgroundColor: '#f0f2f5',
            borderBottom: '1px solid #d9d9d9'
          }}
        >
          {tabItems.map(item => (
            <Tabs.TabPane 
              tab={
                <div className="tab-content">
                  <span className="tab-icon">{item.icon}</span>
                  <span className="tab-label">{item.label}</span>
                </div>
              } 
              key={item.id}
            />
          ))}
        </Tabs>
      </div>

      {/* 工具栏 */}
      <div className="app-toolbar">
        <div className="toolbar-left">
          <Tooltip title="新建项目">
            <Button type="primary" className="toolbar-button">新建</Button>
          </Tooltip>
          <Tooltip title="编辑项目">
            <Button className="toolbar-button">编辑</Button>
          </Tooltip>
          <Tooltip title="删除项目">
            <Button className="toolbar-button">删除</Button>
          </Tooltip>
          <Tooltip title="保存更改">
            <Button className="toolbar-button">保存</Button>
          </Tooltip>
          <div className="toolbar-separator"></div>
          <Tooltip title="导出数据">
            <Button className="toolbar-button">导出</Button>
          </Tooltip>
          <Tooltip title="导入数据">
            <Button className="toolbar-button">导入</Button>
          </Tooltip>
        </div>
        <div className="toolbar-right">
          <Tooltip title="刷新页面">
            <Button className="toolbar-button">刷新</Button>
          </Tooltip>
          <Tooltip title="打印页面">
            <Button className="toolbar-button">打印</Button>
          </Tooltip>
          <Tooltip title="系统设置">
            <Button className="toolbar-button">设置</Button>
          </Tooltip>
        </div>
      </div>

      {/* 主内容区域 */}
      <Content className="main-content">
        {/* 根据当前路径渲染不同的组件 */}
        {location.pathname === '/user-exams' && <UserExamPage />}
        {location.pathname === '/exams' && <ExamManagement />}
        {location.pathname === '/students' && <StudentManagement />}
        {location.pathname === '/questions' && <QuestionManagement />}
        {location.pathname === '/scores' && <ScoreAnalysis />}
        {location.pathname === '/users' && <UserManagement />}
        {location.pathname === '/settings' && <Settings />}
      </Content>

      {/* 状态栏 */}
      <Footer className="app-statusbar">
        <div className="statusbar-left">
          <span>就绪</span>
        </div>
        <div className="statusbar-center">
          <span>© 2026 考试管理系统</span>
        </div>
        <div className="statusbar-right">
          <span>版本 1.0.0</span>
        </div>
      </Footer>
    </Layout>
  )
}

// 主应用组件
function App() {
  // 在应用启动时，确保清除本地存储中的用户信息
  // 这样每次启动应用都会显示登录页面
  // 在组件渲染之前就清除用户信息，避免显示空白页面
  try {
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Failed to clear user info from localStorage:', error)
  }

  // 由于localStorage的清除操作是同步的，不需要使用useEffect钩子
  // 这样在组件渲染之前就会清除用户信息，AuthGuard组件会直接重定向到登录页面

  return (
    <ConfigProvider theme={industrialTheme}>
      <Router>
        <Routes>
          {/* 登录页面路由 */}
          <Route path="/login" element={<Login />} />
          {/* 受保护的路由 */}
          <Route path="/" element={<AuthGuard />}>
            {/* 根路径重定向到user-exams页面 */}
            <Route index element={<Navigate to="/user-exams" />} />
            {/* 其他子路由 */}
            <Route path="user-exams" element={<AppContent />} />
            <Route path="exams" element={<AppContent />} />
            <Route path="students" element={<AppContent />} />
            <Route path="questions" element={<AppContent />} />
            <Route path="scores" element={<AppContent />} />
            <Route path="users" element={<AppContent />} />
            <Route path="settings" element={<AppContent />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
