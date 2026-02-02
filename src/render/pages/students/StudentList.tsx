import React, { useState } from 'react'

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

// 模拟考生数据
const mockStudents: Student[] = [
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
    updated_at: '2026-01-01T00:00:00'
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
    updated_at: '2026-01-01T00:00:00'
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
    updated_at: '2026-01-01T00:00:00'
  }
]

interface StudentListProps {
  onEdit: (student: Student) => void
  onDelete: (studentId: string) => void
  onView: (studentId: string) => void
}

const StudentList: React.FC<StudentListProps> = ({ onEdit, onDelete, onView }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [classFilter, setClassFilter] = useState('all')

  // 获取性别的中文显示
  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return '男'
      case 'female': return '女'
      default: return gender
    }
  }

  // 获取所有班级选项
  const classOptions = ['all', ...Array.from(new Set(students.map(student => student.class)))]

  // 过滤考生列表
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === 'all' || student.class === classFilter
    return matchesSearch && matchesClass
  })

  return (
    <div className="student-list-container">
      {/* 搜索和筛选 */}
      <div className="student-list-header">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索考生..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="class-filter"
          >
            {classOptions.map(classOption => (
              <option key={classOption} value={classOption}>
                {classOption === 'all' ? '全部班级' : classOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 考生列表 */}
      <div className="student-list">
        <table className="student-table">
          <thead>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>性别</th>
              <th>出生日期</th>
              <th>邮箱</th>
              <th>电话</th>
              <th>班级</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{getGenderText(student.gender)}</td>
                  <td>{new Date(student.birthdate).toLocaleDateString()}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.class}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-view"
                        onClick={() => onView(student.id)}
                      >
                        查看
                      </button>
                      <button 
                        className="btn btn-edit"
                        onClick={() => onEdit(student)}
                      >
                        编辑
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => onDelete(student.id)}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
                  暂无考生数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList
