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
import { Card, Select, Typography, Row, Col, Table, Tag, Space, Statistic } from 'antd'
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
          tension: 0.3,
          pointBackgroundColor: 'rgb(53, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(53, 162, 235)',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: '及格线',
          data: Array(examScores.length).fill(mockScoreData.exams.find(e => e.id === selectedExam)?.passScore || 60),
          borderColor: 'rgb(255, 99, 132)',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
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
          hoverOffset: 10,
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    }

    // 图表配置选项
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          cornerRadius: 4,
          titleFont: {
            size: 14,
          },
          bodyFont: {
            size: 13,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    }

    return { lineData, pieData, barData, chartOptions }
  }

  const { lineData, pieData, barData, chartOptions } = prepareChartData()

  // 表格列配置
  const columns = [
    {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: '姓名',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <span style={{ fontWeight: 500 }}>{score}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'passed' ? 'success' : 'error'}>
          {status === 'passed' ? '及格' : '不及格'}
        </Tag>
      ),
    },
    {
      title: '考试日期',
      dataIndex: 'exam_date',
      key: 'exam_date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  return (
    <div style={{ padding: '20px' }}>
      {/* 页面头部 */}
      <div style={{ marginBottom: '24px' }}>
        <Typography.Title level={3}>成绩分析</Typography.Title>
        <Space direction="horizontal">
          <Typography.Text strong>选择考试：</Typography.Text>
          <Select
            value={selectedExam}
            onChange={(value) => setSelectedExam(value)}
            style={{ width: 300 }}
            options={mockScoreData.exams.map(exam => ({
              value: exam.id,
              label: exam.name
            }))}
          />
        </Space>
      </div>

      {/* 成绩统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={true}>
            <Statistic title="平均分" value={statistics.averageScore} precision={2} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={true}>
            <Statistic title="及格率" value={statistics.passRate} precision={2} suffix="%" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={true}>
            <Statistic title="最高分" value={statistics.highestScore} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={true}>
            <Statistic title="最低分" value={statistics.lowestScore} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={true}>
            <Statistic title="参考人数" value={statistics.totalStudents} />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {/* 学生成绩折线图 */}
        <Col xs={24} md={12}>
          <Card title="学生成绩" bordered={true}>
            <div style={{ height: 300 }}>
              {examScores.length > 0 ? (
                <Line data={lineData} options={chartOptions} />
              ) : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  color: '#666'
                }}>
                  暂无成绩数据
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* 及格/不及格分布饼图 */}
        <Col xs={24} md={12}>
          <Card title="及格情况" bordered={true}>
            <div style={{ height: 300 }}>
              {examScores.length > 0 ? (
                <Pie data={pieData} options={chartOptions} />
              ) : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  color: '#666'
                }}>
                  暂无成绩数据
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* 成绩分布柱状图 */}
        <Col xs={24}>
          <Card title="成绩分布" bordered={true}>
            <div style={{ height: 300 }}>
              {examScores.length > 0 ? (
                <Bar data={barData} options={chartOptions} />
              ) : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  color: '#666'
                }}>
                  暂无成绩数据
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 成绩列表 */}
      <Card title="成绩明细" bordered={true}>
        {examScores.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={examScores} 
            rowKey={(record: any) => `${record.exam_id}-${record.student_id}`} 
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 200,
            color: '#666'
          }}>
            暂无成绩数据
          </div>
        )}
      </Card>
    </div>
  )
}

export default ScoreAnalysis
