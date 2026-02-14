# 考试系统数据库模型设计

## 核心模型

### 1. User（用户）

- id: 主键
- username: 用户名
- password: 密码（加密存储）
- role: 角色（admin/teacher/student）
- name: 真实姓名
- email: 邮箱
- created_at: 创建时间
- updated_at: 更新时间

### 2. Exam（考试）

- id: 主键
- title: 考试标题
- description: 考试描述
- duration: 考试时长（分钟）
- start_time: 开始时间
- end_time: 结束时间
- status: 状态（draft/published/ended）
- pass_score: 及格分数
- created_by: 创建者ID
- created_at: 创建时间
- updated_at: 更新时间

### 3. Student（考生）

- id: 主键
- student_id: 学号
- name: 姓名
- gender: 性别
- birthdate: 出生日期
- email: 邮箱
- phone: 电话
- class: 班级
- created_at: 创建时间
- updated_at: 更新时间

### 4. Question（试题）

- id: 主键
- type: 类型（single/multiple/truefalse/essay）
- content: 题目内容
- score: 分值
- difficulty: 难度（easy/medium/hard）
- created_by: 创建者ID
- created_at: 创建时间
- updated_at: 更新时间

### 5. QuestionOption（试题选项）

- id: 主键
- question_id: 试题ID
- content: 选项内容
- is_correct: 是否正确选项
- order: 选项顺序

### 6. ExamQuestion（考试试题关联）

- id: 主键
- exam_id: 考试ID
- question_id: 试题ID
- order: 试题顺序

### 7. ExamRecord（考试记录）

- id: 主键
- exam_id: 考试ID
- student_id: 考生ID
- start_time: 开始时间
- end_time: 结束时间
- status: 状态（in_progress/completed）
- score: 得分
- created_at: 创建时间

### 8. Answer（答题记录）

- id: 主键
- exam_record_id: 考试记录ID
- question_id: 试题ID
- answer: 答案内容
- is_correct: 是否正确
- score: 得分

## API接口设计

### 用户管理

- POST /api/auth/login - 用户登录
- POST /api/auth/logout - 用户登出
- GET /api/users - 获取用户列表
- POST /api/users - 创建用户
- GET /api/users/:id - 获取用户详情
- PUT /api/users/:id - 更新用户
- DELETE /api/users/:id - 删除用户

### 考试管理

- GET /api/exams - 获取考试列表
- POST /api/exams - 创建考试
- GET /api/exams/:id - 获取考试详情
- PUT /api/exams/:id - 更新考试
- DELETE /api/exams/:id - 删除考试
- GET /api/exams/:id/questions - 获取考试试题
- POST /api/exams/:id/questions - 添加考试试题
- DELETE /api/exams/:id/questions/:questionId - 移除考试试题

### 考生管理

- GET /api/students - 获取考生列表
- POST /api/students - 创建考生
- GET /api/students/:id - 获取考生详情
- PUT /api/students/:id - 更新考生
- DELETE /api/students/:id - 删除考生

### 试题管理

- GET /api/questions - 获取试题列表
- POST /api/questions - 创建试题
- GET /api/questions/:id - 获取试题详情
- PUT /api/questions/:id - 更新试题
- DELETE /api/questions/:id - 删除试题

### 考试记录和成绩

- GET /api/exam-records - 获取考试记录列表
- GET /api/exam-records/:id - 获取考试记录详情
- GET /api/exam-records/:id/answers - 获取答题记录
- GET /api/scores - 获取成绩列表
- GET /api/scores/:id - 获取成绩详情
- GET /api/scores/student/:studentId - 获取考生成绩
- GET /api/scores/exam/:examId - 获取考试成绩统计
