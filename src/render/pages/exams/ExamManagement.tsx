import React, { useState } from 'react'
import ExamList from './ExamList'
import ExamForm from './ExamForm'
import './ExamManagement.css'

// 考试数据类型定义
interface Exam {
  id: string
  title: string
  description: string
  duration: number
  start_time: string
  end_time: string
  status: 'draft' | 'published' | 'ended'
  pass_score: number
  created_by: string
  created_at: string
  updated_at: string
}

const ExamManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | undefined>()
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: '2026年春季学期数学期末考试',
      description: '高等数学上册内容，包括极限、导数、积分等知识点',
      duration: 120,
      start_time: '2026-06-15T09:00:00',
      end_time: '2026-06-15T11:00:00',
      status: 'published',
      pass_score: 60,
      created_by: 'admin',
      created_at: '2026-06-01T10:00:00',
      updated_at: '2026-06-10T15:00:00'
    },
    {
      id: '2',
      title: '2026年春季学期英语期中考试',
      description: '大学英语四级水平测试，包括听力、阅读、写作等部分',
      duration: 90,
      start_time: '2026-04-20T14:00:00',
      end_time: '2026-04-20T15:30:00',
      status: 'ended',
      pass_score: 60,
      created_by: 'admin',
      created_at: '2026-04-01T09:00:00',
      updated_at: '2026-04-15T10:00:00'
    },
    {
      id: '3',
      title: '2026年春季学期计算机基础考试',
      description: '计算机基础知识测试，包括操作系统、网络、办公软件等内容',
      duration: 100,
      start_time: '2026-06-20T10:00:00',
      end_time: '2026-06-20T11:40:00',
      status: 'draft',
      pass_score: 60,
      created_by: 'admin',
      created_at: '2026-06-12T08:00:00',
      updated_at: '2026-06-12T08:00:00'
    }
  ])

  // 打开创建考试表单
  const handleCreateExam = () => {
    setEditingExam(undefined)
    setIsFormOpen(true)
  }

  // 打开编辑考试表单
  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam)
    setIsFormOpen(true)
  }

  // 删除考试
  const handleDeleteExam = (examId: string) => {
    if (window.confirm('确定要删除这个考试吗？')) {
      setExams(prevExams => prevExams.filter(exam => exam.id !== examId))
    }
  }

  // 查看考试详情
  const handleViewExam = (examId: string) => {
    // 这里可以实现查看考试详情的逻辑
    alert(`查看考试 ID: ${examId}`)
  }

  // 提交考试表单
  const handleSubmitExam = (examData: any) => {
    if (editingExam) {
      // 更新现有考试
      setExams(prevExams =>
        prevExams.map(exam =>
          exam.id === editingExam.id
            ? {
                ...exam,
                ...examData,
                updated_at: new Date().toISOString()
              }
            : exam
        )
      )
    } else {
      // 创建新考试
      const newExam: Exam = {
        id: Math.random().toString(36).substr(2, 9),
        ...examData,
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setExams(prevExams => [...prevExams, newExam])
    }
    setIsFormOpen(false)
  }

  // 取消表单
  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingExam(undefined)
  }

  return (
    <div className="exam-management-container">
      <div className="page-header">
        <h1>考试管理</h1>
        <button className="btn btn-primary" onClick={handleCreateExam}>
          + 创建新考试
        </button>
      </div>

      {isFormOpen ? (
        <ExamForm
          exam={editingExam}
          onSubmit={handleSubmitExam}
          onCancel={handleCancelForm}
        />
      ) : (
        <ExamList
          onEdit={handleEditExam}
          onDelete={handleDeleteExam}
          onView={handleViewExam}
        />
      )}
    </div>
  )
}

export default ExamManagement
