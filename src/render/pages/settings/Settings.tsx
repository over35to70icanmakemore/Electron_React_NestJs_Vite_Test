import React, { useState } from 'react'
import './Settings.css'

const Settings: React.FC = () => {
  // 考试设置状态
  const [examSettings, setExamSettings] = useState({
    autoSubmit: true,
    showTimer: true,
    randomQuestions: false,
    passScore: 60,
    examDuration: 120, // 分钟
    maxAttempts: 1
  })

  // 系统设置状态
  const [systemSettings, setSystemSettings] = useState({
    language: 'zh-CN',
    theme: 'light',
    autoSave: true,
    backupInterval: 24, // 小时
    notificationEnabled: true
  })

  // 处理考试设置变化
  const handleExamSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setExamSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }))
  }

  // 处理系统设置变化
  const handleSystemSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // 保存设置
  const handleSaveSettings = () => {
    // 这里可以添加保存设置的逻辑
    console.log('保存考试设置:', examSettings)
    console.log('保存系统设置:', systemSettings)
    // 模拟保存成功
    alert('设置已保存')
  }

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>系统设置</h1>
      </div>

      <div className="settings-content">
        {/* 考试设置 */}
        <div className="setting-section">
          <h2>考试设置</h2>
          <div className="setting-form">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="autoSubmit"
                  checked={examSettings.autoSubmit}
                  onChange={handleExamSettingChange}
                />
                自动提交
              </label>
              <span className="form-help">考试时间结束后自动提交试卷</span>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="showTimer"
                  checked={examSettings.showTimer}
                  onChange={handleExamSettingChange}
                />
                显示倒计时
              </label>
              <span className="form-help">在考试页面显示剩余时间</span>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="randomQuestions"
                  checked={examSettings.randomQuestions}
                  onChange={handleExamSettingChange}
                />
                随机出题
              </label>
              <span className="form-help">每次考试随机生成试题顺序</span>
            </div>

            <div className="form-group">
              <label htmlFor="passScore">及格分数：</label>
              <input
                type="number"
                id="passScore"
                name="passScore"
                min="0"
                max="100"
                value={examSettings.passScore}
                onChange={handleExamSettingChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="examDuration">考试时长（分钟）：</label>
              <input
                type="number"
                id="examDuration"
                name="examDuration"
                min="1"
                max="300"
                value={examSettings.examDuration}
                onChange={handleExamSettingChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxAttempts">最大尝试次数：</label>
              <input
                type="number"
                id="maxAttempts"
                name="maxAttempts"
                min="1"
                max="10"
                value={examSettings.maxAttempts}
                onChange={handleExamSettingChange}
              />
            </div>
          </div>
        </div>

        {/* 系统设置 */}
        <div className="setting-section">
          <h2>系统设置</h2>
          <div className="setting-form">
            <div className="form-group">
              <label htmlFor="language">语言：</label>
              <select
                id="language"
                name="language"
                value={systemSettings.language}
                onChange={handleSystemSettingChange}
              >
                <option value="zh-CN">中文</option>
                <option value="en-US">English</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="theme">主题：</label>
              <select
                id="theme"
                name="theme"
                value={systemSettings.theme}
                onChange={handleSystemSettingChange}
              >
                <option value="light">浅色</option>
                <option value="dark">深色</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="autoSave"
                  checked={systemSettings.autoSave}
                  onChange={handleSystemSettingChange}
                />
                自动保存
              </label>
              <span className="form-help">自动保存表单数据</span>
            </div>

            <div className="form-group">
              <label htmlFor="backupInterval">备份间隔（小时）：</label>
              <input
                type="number"
                id="backupInterval"
                name="backupInterval"
                min="1"
                max="168"
                value={systemSettings.backupInterval}
                onChange={handleSystemSettingChange}
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="notificationEnabled"
                  checked={systemSettings.notificationEnabled}
                  onChange={handleSystemSettingChange}
                />
                启用通知
              </label>
              <span className="form-help">接收系统通知</span>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="settings-actions">
          <button className="save-button" onClick={handleSaveSettings}>
            保存设置
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings