import React, { useState } from 'react'
import QuestionList from './QuestionList'
import QuestionForm from './QuestionForm'
import './QuestionManagement.css'

// 试题数据类型定义
interface Question {
  id: string
  type: 'single' | 'multiple' | 'truefalse' | 'essay'
  content: string
  score: number
  difficulty: 'easy' | 'medium' | 'hard'
  created_by: string
  created_at: string
  updated_at: string
}

const QuestionManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>()
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'single',
      content: '以下哪个是 JavaScript 的基本数据类型？',
      score: 5,
      difficulty: 'easy',
      created_by: 'admin',
      created_at: '2026-01-01T00:00:00',
      updated_at: '2026-01-01T00:00:00'
    },
    {
      id: '2',
      type: 'multiple',
      content: '以下哪些是 React 的生命周期方法？',
      score: 10,
      difficulty: 'medium',
      created_by: 'admin',
      created_at: '2026-01-02T00:00:00',
      updated_at: '2026-01-02T00:00:00'
    },
    {
      id: '3',
      type: 'truefalse',
      content: 'TypeScript 是 JavaScript 的超集。',
      score: 3,
      difficulty: 'easy',
      created_by: 'admin',
      created_at: '2026-01-03T00:00:00',
      updated_at: '2026-01-03T00:00:00'
    },
    {
      id: '4',
      type: 'essay',
      content: '请详细说明 Node.js 的事件循环机制。',
      score: 15,
      difficulty: 'hard',
      created_by: 'admin',
      created_at: '2026-01-04T00:00:00',
      updated_at: '2026-01-04T00:00:00'
    }
  ])

  // 打开添加试题表单
  const handleAddQuestion = () => {
    setEditingQuestion(undefined)
    setIsFormOpen(true)
  }

  // 打开编辑试题表单
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setIsFormOpen(true)
  }

  // 删除试题
  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('确定要删除这个试题吗？')) {
      setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId))
    }
  }

  // 查看试题详情
  const handleViewQuestion = (questionId: string) => {
    // 这里可以实现查看试题详情的逻辑
    alert(`查看试题 ID: ${questionId}`)
  }

  // 提交试题表单
  const handleSubmitQuestion = (questionData: any) => {
    if (editingQuestion) {
      // 更新现有试题
      setQuestions(prevQuestions =>
        prevQuestions.map(question =>
          question.id === editingQuestion.id
            ? {
                ...question,
                ...questionData,
                updated_at: new Date().toISOString()
              }
            : question
        )
      )
    } else {
      // 创建新试题
      const newQuestion: Question = {
        id: Math.random().toString(36).substr(2, 9),
        ...questionData,
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setQuestions(prevQuestions => [...prevQuestions, newQuestion])
    }
    setIsFormOpen(false)
  }

  // 取消表单
  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingQuestion(undefined)
  }

  return (
    <div className="question-management-container">
      <div className="page-header">
        <h1>试题库</h1>
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          + 添加新试题
        </button>
      </div>

      {isFormOpen ? (
        <QuestionForm
          question={editingQuestion}
          onSubmit={handleSubmitQuestion}
          onCancel={handleCancelForm}
        />
      ) : (
        <QuestionList
          onEdit={handleEditQuestion}
          onDelete={handleDeleteQuestion}
          onView={handleViewQuestion}
        />
      )}
    </div>
  )
}

export default QuestionManagement
