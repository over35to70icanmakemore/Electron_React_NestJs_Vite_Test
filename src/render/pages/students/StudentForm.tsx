import React, { useState, useEffect } from 'react'

// 考生数据类型定义
interface Student {
  id?: string
  student_id: string
  name: string
  gender: 'male' | 'female'
  birthdate: string
  email: string
  phone: string
  class: string
}

interface StudentFormProps {
  student?: Student
  onSubmit: (student: Student) => void
  onCancel: () => void
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Student>({
    student_id: '',
    name: '',
    gender: 'male',
    birthdate: new Date().toISOString().slice(0, 10),
    email: '',
    phone: '',
    class: ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Student, string>>>({})

  // 如果传入了考生数据，初始化表单
  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        student_id: student.student_id,
        name: student.name,
        gender: student.gender,
        birthdate: student.birthdate,
        email: student.email,
        phone: student.phone,
        class: student.class
      })
    }
  }, [student])

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Student, string>> = {}

    if (!formData.student_id.trim()) {
      newErrors.student_id = '学号不能为空'
    }

    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空'
    }

    if (!formData.gender) {
      newErrors.gender = '性别不能为空'
    }

    if (!formData.birthdate) {
      newErrors.birthdate = '出生日期不能为空'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码'
    }

    if (!formData.class.trim()) {
      newErrors.class = '班级不能为空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="student-form-container">
      <h2>{student ? '编辑考生' : '添加新考生'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="student_id">学号 *</label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className={errors.student_id ? 'error' : ''}
              placeholder="请输入学号"
            />
            {errors.student_id && <div className="error-message">{errors.student_id}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="name">姓名 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="请输入姓名"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">性别 *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">出生日期 *</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className={errors.birthdate ? 'error' : ''}
            />
            {errors.birthdate && <div className="error-message">{errors.birthdate}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="请输入邮箱"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">电话</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="请输入手机号码"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="class">班级 *</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className={errors.class ? 'error' : ''}
            placeholder="请输入班级"
          />
          {errors.class && <div className="error-message">{errors.class}</div>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            取消
          </button>
          <button type="submit" className="btn btn-submit">
            {student ? '更新考生' : '添加考生'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm
