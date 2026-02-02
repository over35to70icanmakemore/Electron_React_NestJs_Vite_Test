import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import './ScoreAnalysis.css'

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// 模拟成绩数据
const mockScoreData = {
  exams: [
    { id: '1', name: '2026年春季学期数学期末考试', passScore: 60 },
    { id: '2', name: '2026年春季学期英语期中考试', passScore: 60 },
    { id: '3', name: '2026年春季学期计算机基础考试', passScore: 60 }
  ],
  scores: [
    {
      exam_id: '1',
      exam_name: '2026年春季学期数学期末考试',
      student_id: '20230001',
      student_name: '张三',
      score: 85,
      status: 'passed',
      exam_date: '2026-06-15'
    },
    {
      exam_id: '1',
      exam_name: '2026年春季学期数学期末考试',
      student_id: '20230002',
      student_name: '李四',
      score: 72,
      status: 'passed',
      exam_date: '2026-06-15'
    },
    {
      exam_id: '1',
      exam_name: '2026年春季学期数学期末考试',
      student_id: '20230003',
      student_name: '王五',
      score: 58,
      status: 'failed',
      exam_date: '2026-06-15'
    },
    {
      exam_id: '2',
      exam_name: '2026年春季学期英语期中考试',
      student_id: '20230001',
      student_name: '张三',
      score: 92,
      status: 'passed',
      exam_date: '2026-04-20'
    },
    {
      exam_id: '2',
      exam_name: '2026年春季学期英语期中考试',
      student_id: '20230002',
      student_name: '李四',
      score: 88,
      status: 'passed',
      exam_date: '2026-04-20'
    },
    {
      exam_id: '2',
      exam_name: '2026年春季学期英语期中考试',
      student_id: '20230003',
      student_name: '王五',
      score: 76,
      status: 'passed',
      exam_date: '2026-04-20'
    }
  ]
}

const ScoreAnalysis: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('1')
  const [examScores, setExamScores] = useState<any[]>([])
  const [statistics, setStatistics] = useState({
    averageScore: 0,
    passRate: 0,
    highestScore: 0,
    lowestScore: 0,
    totalStudents: 0
  })

  // 当选择的考试变化时，更新成绩数据和统计信息
  useEffect(() => {
    const scores = mockScoreData.scores.filter(score => score.exam_id === selectedExam)
    setExamScores(scores)

    if (scores.length > 0) {
      const totalScore = scores.reduce((sum, score) => sum + score.score, 0)
      const averageScore = totalScore / scores.length
      const passCount = scores.filter(score => score.status === 'passed').length
      const passRate = (passCount / scores.length) * 100
      const highestScore = Math.max(...scores.map(score => score.score))
      const lowestScore = Math.min(...scores.map(score => score.score))

      setStatistics({
        averageScore: parseFloat(averageScore.toFixed(2)),
        passRate: parseFloat(passRate.toFixed(2)),
        highestScore,
        lowestScore,
        totalStudents: scores.length
      })
    }
  }, [selectedExam])

  // 准备图表数据
  const prepareChartData = () => {
    // 折线图数据（学生成绩趋势）
    const lineData = {
      labels: examScores.map(score => score.student_name),
      datasets: [
        {
          label: '成绩',
          data: examScores.map(score => score.score),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1,
        },
        {
          label: '及格线',
          data: Array(examScores.length).fill(mockScoreData.exams.find(e => e.id === selectedExam)?.passScore || 60),
          borderColor: 'rgb(255, 99, 132)',
          borderDash: [5, 5],
          fill: false,
        },
      ],
    }

    // 饼图数据（及格/不及格分布）
    const passCount = examScores.filter(score => score.status === 'passed').length
    const failCount = examScores.filter(score => score.status === 'failed').length
    const pieData = {
      labels: ['及格', '不及格'],
      datasets: [
        {
          data: [passCount, failCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
          ],
          borderWidth: 1,
        },
      ],
    }

    // 柱状图数据（成绩分布区间）
    const scoreRanges = {
      '0-59': 0,
      '60-69': 0,
      '70-79': 0,
      '80-89': 0,
      '90-100': 0,
    }

    examScores.forEach(score => {
      if (score.score < 60) scoreRanges['0-59']++
      else if (score.score < 70) scoreRanges['60-69']++
      else if (score.score < 80) scoreRanges['70-79']++
      else if (score.score < 90) scoreRanges['80-89']++
      else scoreRanges['90-100']++
    })

    const barData = {
      labels: Object.keys(scoreRanges),
      datasets: [
        {
          label: '学生人数',
          data: Object.values(scoreRanges),
          backgroundColor: 'rgba(153, 102, 255, 0.8)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1,
        },
      ],
    }

    return { lineData, pieData, barData }
  }

  const { lineData, pieData, barData } = prepareChartData()

  return (
    <div className="score-analysis-container">
      <div className="page-header">
        <h1>成绩分析</h1>
        <div className="exam-selector">
          <label htmlFor="exam-select">选择考试：</label>
          <select
            id="exam-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            {mockScoreData.exams.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 成绩统计卡片 */}
      <div className="statistics-cards">
        <div className="stat-card">
          <h3>平均分</h3>
          <p className="stat-value">{statistics.averageScore}</p>
        </div>
        <div className="stat-card">
          <h3>及格率</h3>
          <p className="stat-value">{statistics.passRate}%</p>
        </div>
        <div className="stat-card">
          <h3>最高分</h3>
          <p className="stat-value">{statistics.highestScore}</p>
        </div>
        <div className="stat-card">
          <h3>最低分</h3>
          <p className="stat-value">{statistics.lowestScore}</p>
        </div>
        <div className="stat-card">
          <h3>参考人数</h3>
          <p className="stat-value">{statistics.totalStudents}</p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="charts-container">
        {/* 学生成绩折线图 */}
        <div className="chart-card">
          <h3>学生成绩</h3>
          {examScores.length > 0 ? (
            <Line data={lineData} />
          ) : (
            <div className="no-data">暂无成绩数据</div>
          )}
        </div>

        {/* 及格/不及格分布饼图 */}
        <div className="chart-card">
          <h3>及格情况</h3>
          {examScores.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <div className="no-data">暂无成绩数据</div>
          )}
        </div>

        {/* 成绩分布柱状图 */}
        <div className="chart-card full-width">
          <h3>成绩分布</h3>
          {examScores.length > 0 ? (
            <Bar data={barData} />
          ) : (
            <div className="no-data">暂无成绩数据</div>
          )}
        </div>
      </div>

      {/* 成绩列表 */}
      <div className="score-list-container">
        <h3>成绩明细</h3>
        {examScores.length > 0 ? (
          <table className="score-table">
            <thead>
              <tr>
                <th>学号</th>
                <th>姓名</th>
                <th>成绩</th>
                <th>状态</th>
                <th>考试日期</th>
              </tr>
            </thead>
            <tbody>
              {examScores.map(score => (
                <tr key={`${score.exam_id}-${score.student_id}`}>
                  <td>{score.student_id}</td>
                  <td>{score.student_name}</td>
                  <td>{score.score}</td>
                  <td>
                    <span className={`status-badge ${score.status}`}>
                      {score.status === 'passed' ? '及格' : '不及格'}
                    </span>
                  </td>
                  <td>{new Date(score.exam_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">暂无成绩数据</div>
        )}
      </div>
    </div>
  )
}

export default ScoreAnalysis
