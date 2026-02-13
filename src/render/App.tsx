import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import { CalendarOutlined, FileTextOutlined, UserOutlined, FileOutlined, BarChartOutlined, SettingOutlined, TeamOutlined, ArrowLeftOutlined, RobotOutlined, ThunderboltOutlined, QuestionCircleOutlined, CloudOutlined, ScheduleOutlined, CheckSquareOutlined, IdcardOutlined, BookOutlined } from '@ant-design/icons'
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
import MyExamPage from './pages/user-exams/MyExamPage'

// 导入新的页面组件
import AIKnowledge from './pages/ai-knowledge/AIKnowledge'
import AIBot from './pages/ai-bot/AIBot'
import MockExam from './pages/mock-exam/MockExam'
import Quiz from './pages/quiz/Quiz'
import Weather from './pages/weather/Weather'
import Schedule from './pages/schedule/Schedule'
import TodoList from './pages/todo/TodoList'
import Profile from './pages/profile/Profile'

// 导入组件
import AuthGuard from './components/AuthGuard'

const { Content } = Layout

// 桌面图标卡片组件
interface DesktopCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  color: string
}

const DesktopCard: React.FC<DesktopCardProps> = ({ icon, title, description, onClick, color }) => {
  return (
    <div className="desktop-card" onClick={onClick}>
      <div className="card-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}>
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-arrow">
        <span>→</span>
      </div>
    </div>
  )
}

// 桌面主页组件
const DesktopHome: React.FC = () => {
  const navigate = useNavigate()

  const desktopCards = [
    {
      id: 'user-exams',
      icon: <CalendarOutlined />,
      title: '我的考试',
      description: '查看考试信息和预约情况',
      color: '#4a90e2',
      path: '/user-exams'
    },
    {
      id: 'exams',
      icon: <FileTextOutlined />,
      title: '考试管理',
      description: '创建和管理考试项目',
      color: '#52c41a',
      path: '/exams'
    },
    {
      id: 'students',
      icon: <TeamOutlined />,
      title: '考生管理',
      description: '管理考生信息和数据',
      color: '#fa8c16',
      path: '/students'
    },
    {
      id: 'questions',
      icon: <FileOutlined />,
      title: '试题库',
      description: '维护试题资源库',
      color: '#13c2c2',
      path: '/questions'
    },
    {
      id: 'scores',
      icon: <BarChartOutlined />,
      title: '成绩分析',
      description: '统计和分析考试成绩',
      color: '#722ed1',
      path: '/scores'
    },
    {
      id: 'ai-knowledge',
      icon: <BookOutlined />,
      title: 'AI知识库',
      description: '智能知识检索与学习',
      color: '#1890ff',
      path: '/ai-knowledge'
    },
    {
      id: 'ai-bot',
      icon: <RobotOutlined />,
      title: '智能机器人',
      description: 'AI智能问答助手',
      color: '#13c2c2',
      path: '/ai-bot'
    },
    {
      id: 'mock-exam',
      icon: <ThunderboltOutlined />,
      title: '模拟练习',
      description: '在线模拟考试练习',
      color: '#faad14',
      path: '/mock-exam'
    },
    {
      id: 'quiz',
      icon: <QuestionCircleOutlined />,
      title: '趣味问答',
      description: '趣味知识问答挑战',
      color: '#eb2f96',
      path: '/quiz'
    },
    {
      id: 'weather',
      icon: <CloudOutlined />,
      title: '天气预报',
      description: '查看实时天气信息',
      color: '#36cfc9',
      path: '/weather'
    },
    {
      id: 'schedule',
      icon: <ScheduleOutlined />,
      title: '行程日历',
      description: '管理日程和安排',
      color: '#722ed1',
      path: '/schedule'
    },
    {
      id: 'todo',
      icon: <CheckSquareOutlined />,
      title: '我的待办',
      description: '管理待办事项清单',
      color: '#52c41a',
      path: '/todo'
    },
    {
      id: 'profile',
      icon: <IdcardOutlined />,
      title: '个人资料',
      description: '查看和编辑个人信息',
      color: '#fa8c16',
      path: '/profile'
    },
    {
      id: 'users',
      icon: <UserOutlined />,
      title: '用户管理',
      description: '管理系统用户权限',
      color: '#eb2f96',
      path: '/users'
    },
    {
      id: 'settings',
      icon: <SettingOutlined />,
      title: '系统设置',
      description: '配置系统参数选项',
      color: '#595959',
      path: '/settings'
    }
  ]

  return (
    <div className="desktop-home">
      {/* 桌面标题 */}
      <div className="desktop-header">
        <h1 className="desktop-title">考试管理系统</h1>
        <p className="desktop-subtitle">欢迎使用，请选择功能模块</p>
      </div>

      {/* 桌面卡片网格 */}
      <div className="desktop-grid">
        {desktopCards.map(card => (
          <DesktopCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            color={card.color}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>

      {/* 桌面底部信息 */}
      <div className="desktop-footer">
        <span>版本 1.0.0</span>
        <span>© 2026 考试管理系统</span>
      </div>
    </div>
  )
}

// 功能页面包装器组件
interface PageWrapperProps {
  title: string
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      {/* 页面顶部栏 */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeftOutlined />
          <span>返回桌面</span>
        </button>
        <h2 className="page-title">{title}</h2>
      </div>

      {/* 页面内容 */}
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

// 主应用内容组件
const AppContent = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 处理根路径重定向
  useEffect(() => {
    if (location.pathname === '/') {
      // 显示桌面主页
    }
  }, [location.pathname, navigate])

  // 判断是否在桌面主页
  const isDesktop = location.pathname === '/'

  return (
    <Layout className="desktop-app-container">
      {/* 主内容区域 */}
      <Content className="main-content">
        {isDesktop ? (
          <DesktopHome />
        ) : (
          <>
            {location.pathname === '/user-exams' && (
              <PageWrapper title="我的考试">
                <MyExamPage />
              </PageWrapper>
            )}
            {location.pathname === '/exams' && (
              <PageWrapper title="考试管理">
                <ExamManagement />
              </PageWrapper>
            )}
            {location.pathname === '/students' && (
              <PageWrapper title="考生管理">
                <StudentManagement />
              </PageWrapper>
            )}
            {location.pathname === '/questions' && (
              <PageWrapper title="试题库">
                <QuestionManagement />
              </PageWrapper>
            )}
            {location.pathname === '/scores' && (
              <PageWrapper title="成绩分析">
                <ScoreAnalysis />
              </PageWrapper>
            )}
            {location.pathname === '/ai-knowledge' && (
              <PageWrapper title="AI知识库">
                <AIKnowledge />
              </PageWrapper>
            )}
            {location.pathname === '/ai-bot' && (
              <PageWrapper title="智能机器人">
                <AIBot />
              </PageWrapper>
            )}
            {location.pathname === '/mock-exam' && (
              <PageWrapper title="模拟练习">
                <MockExam />
              </PageWrapper>
            )}
            {location.pathname === '/quiz' && (
              <PageWrapper title="趣味问答">
                <Quiz />
              </PageWrapper>
            )}
            {location.pathname === '/weather' && (
              <PageWrapper title="天气预报">
                <Weather />
              </PageWrapper>
            )}
            {location.pathname === '/schedule' && (
              <PageWrapper title="行程日历">
                <Schedule />
              </PageWrapper>
            )}
            {location.pathname === '/todo' && (
              <PageWrapper title="我的待办">
                <TodoList />
              </PageWrapper>
            )}
            {location.pathname === '/profile' && (
              <PageWrapper title="个人资料">
                <Profile />
              </PageWrapper>
            )}
            {location.pathname === '/users' && (
              <PageWrapper title="用户管理">
                <UserManagement />
              </PageWrapper>
            )}
            {location.pathname === '/settings' && (
              <PageWrapper title="系统设置">
                <Settings />
              </PageWrapper>
            )}
          </>
        )}
      </Content>
    </Layout>
  )
}

// 主应用组件
function App() {
  // 在应用启动时，确保清除本地存储中的用户信息
  try {
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Failed to clear user info from localStorage:', error)
  }

  return (
    <ConfigProvider theme={industrialTheme}>
      <Router>
        <Routes>
          {/* 登录页面路由 */}
          <Route path="/login" element={<Login />} />
          {/* 受保护的路由 */}
          <Route path="/" element={<AuthGuard />}>
            {/* 桌面主页 */}
            <Route index element={<AppContent />} />
            {/* 其他子路由 */}
            <Route path="user-exams" element={<AppContent />} />
            <Route path="exams" element={<AppContent />} />
            <Route path="students" element={<AppContent />} />
            <Route path="questions" element={<AppContent />} />
            <Route path="scores" element={<AppContent />} />
            <Route path="ai-knowledge" element={<AppContent />} />
            <Route path="ai-bot" element={<AppContent />} />
            <Route path="mock-exam" element={<AppContent />} />
            <Route path="quiz" element={<AppContent />} />
            <Route path="weather" element={<AppContent />} />
            <Route path="schedule" element={<AppContent />} />
            <Route path="todo" element={<AppContent />} />
            <Route path="profile" element={<AppContent />} />
            <Route path="users" element={<AppContent />} />
            <Route path="settings" element={<AppContent />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App