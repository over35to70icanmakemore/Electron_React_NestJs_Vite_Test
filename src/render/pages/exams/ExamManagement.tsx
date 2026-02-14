import * as React from 'react'
import { useState } from 'react'
import ExamForm from './ExamForm'
import ExamList from './ExamList'
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
  const handleDeleteExam = async (examId: string) => {
    try {
      // 使用Electron对话框进行确认
      const { response } = await window.electron.showMessageBox({
        type: 'question',
        message: '确定要删除这个考试吗？',
        buttons: ['取消', '确定'],
        defaultId: 0,
      })

      if (response === 1) {
        const result = await window.electron.deleteExam(examId)
        if (result) {
          // 刷新考试列表
          const examListComponent = document.querySelector('.exam-list-container')
          if (examListComponent) {
            // 触发 ExamList 组件的重新渲染
            examListComponent.dispatchEvent(new Event('refresh'))
          }
        }
      }
    }
    catch (error) {
      console.error('删除考试失败:', error)
    }
  }

  // 查看考试详情
  const handleViewExam = (examId: string) => {
    // 这里可以实现查看考试详情的逻辑
    console.warn(`查看考试 ID: ${examId}`)
  }

  // 提交考试表单
  const handleSubmitExam = async (examData: any) => {
    try {
      if (editingExam) {
        // 更新现有考试
        await window.electron.updateExam(editingExam.id, examData)
      }
      else {
        // 创建新考试
        await window.electron.createExam(examData)
      }
      setIsFormOpen(false)
      // 刷新考试列表
      const examListComponent = document.querySelector('.exam-list-container')
      if (examListComponent) {
        examListComponent.dispatchEvent(new Event('refresh'))
      }
    }
    catch (error) {
      console.error('保存考试失败:', error)
    }
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

      {isFormOpen
        ? (
            <ExamForm
              exam={editingExam}
              onSubmit={handleSubmitExam}
              onCancel={handleCancelForm}
            />
          )
        : (
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
