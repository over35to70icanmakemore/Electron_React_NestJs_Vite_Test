import * as React from 'react'
import { useState } from 'react'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
import './StudentManagement.css'

// 考生数据类型定义
interface Student {
  id: string
  student_id: string
  name: string
  gender: 'male' | 'female'
  birthdate: string
  email: string
  phone: string
  class: string
  created_at: string
  updated_at: string
}

const StudentManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | undefined>()
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      student_id: '20230001',
      name: '张三',
      gender: 'male',
      birthdate: '2005-01-01',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      class: '高一(1)班',
      created_at: '2026-01-01T00:00:00',
      updated_at: '2026-01-01T00:00:00',
    },
    {
      id: '2',
      student_id: '20230002',
      name: '李四',
      gender: 'female',
      birthdate: '2005-02-02',
      email: 'lisi@example.com',
      phone: '13800138002',
      class: '高一(1)班',
      created_at: '2026-01-01T00:00:00',
      updated_at: '2026-01-01T00:00:00',
    },
    {
      id: '3',
      student_id: '20230003',
      name: '王五',
      gender: 'male',
      birthdate: '2005-03-03',
      email: 'wangwu@example.com',
      phone: '13800138003',
      class: '高一(2)班',
      created_at: '2026-01-01T00:00:00',
      updated_at: '2026-01-01T00:00:00',
    },
  ])

  // 打开添加考生表单
  const handleAddStudent = () => {
    setEditingStudent(undefined)
    setIsFormOpen(true)
  }

  // 打开编辑考生表单
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  // 删除考生
  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('确定要删除这个考生吗？')) {
      setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId))
    }
  }

  // 查看考生详情
  const handleViewStudent = (studentId: string) => {
    // 这里可以实现查看考生详情的逻辑
    alert(`查看考生 ID: ${studentId}`)
  }

  // 提交考生表单
  const handleSubmitStudent = (studentData: any) => {
    if (editingStudent) {
      // 更新现有考生
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...studentData,
                updated_at: new Date().toISOString(),
              }
            : student,
        ),
      )
    }
    else {
      // 创建新考生
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        ...studentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setStudents(prevStudents => [...prevStudents, newStudent])
    }
    setIsFormOpen(false)
  }

  // 取消表单
  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingStudent(undefined)
  }

  return (
    <div className="student-management-container">
      <div className="page-header">
        <h1>考生管理</h1>
        <button className="btn btn-primary" onClick={handleAddStudent}>
          + 添加新考生
        </button>
      </div>

      {isFormOpen
        ? (
            <StudentForm
              student={editingStudent}
              onSubmit={handleSubmitStudent}
              onCancel={handleCancelForm}
            />
          )
        : (
            <StudentList
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onView={handleViewStudent}
            />
          )}
    </div>
  )
}

export default StudentManagement
