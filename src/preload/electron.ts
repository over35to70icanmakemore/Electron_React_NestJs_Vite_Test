import type { IpcRendererEvent } from 'electron'
import { ipcRenderer } from 'electron'

export default {
  sendMsg: (msg: string): Promise<string> => ipcRenderer.invoke('msg', msg),
  onReplyMsg: (cb: (msg: string) => any) => {
    const handler: (event: IpcRendererEvent, ...args: any[]) => void = (_, msg: string) => {
      cb(msg)
    }
    ipcRenderer.on('reply-msg', handler)
    return () => {
      ipcRenderer.off('reply-msg', handler)
    }
  },
  clearUserInfo: () => {
    localStorage.removeItem('user')
  },
  showMessageBox: (options: any) => ipcRenderer.invoke('showMessageBox', options),

  // 考试相关
  getAllExams: () => ipcRenderer.invoke('getAllExams'),
  getExamById: (id: string) => ipcRenderer.invoke('getExamById', id),
  createExam: (examData: any) => ipcRenderer.invoke('createExam', examData),
  updateExam: (id: string, examData: any) => ipcRenderer.invoke('updateExam', id, examData),
  deleteExam: (id: string) => ipcRenderer.invoke('deleteExam', id),

  // AI知识库相关
  getAllKnowledge: () => ipcRenderer.invoke('getAllKnowledge'),
  getKnowledgeById: (id: string) => ipcRenderer.invoke('getKnowledgeById', id),
  getKnowledgeByCategory: (category: string) => ipcRenderer.invoke('getKnowledgeByCategory', category),
  searchKnowledge: (query: string) => ipcRenderer.invoke('searchKnowledge', query),

  // AI机器人相关
  getChatHistory: () => ipcRenderer.invoke('getChatHistory'),
  getQuickQuestions: () => ipcRenderer.invoke('getQuickQuestions'),
  sendMessage: (content: string) => ipcRenderer.invoke('sendMessage', content),
  clearChatHistory: () => ipcRenderer.invoke('clearChatHistory'),

  // 模拟练习相关
  getAllMockExams: () => ipcRenderer.invoke('getAllMockExams'),
  getMockExamById: (id: string) => ipcRenderer.invoke('getMockExamById', id),
  submitMockExam: (id: string, answers: Record<number, string>) => ipcRenderer.invoke('submitMockExam', id, answers),

  // 趣味问答相关
  getQuizQuestions: (count: number = 5) => ipcRenderer.invoke('getQuizQuestions', count),
  submitQuizAnswer: (questionId: number, answerIndex: number) => ipcRenderer.invoke('submitQuizAnswer', questionId, answerIndex),
  getQuizCategories: () => ipcRenderer.invoke('getQuizCategories'),

  // 天气预报相关
  getWeatherByCity: (city: string) => ipcRenderer.invoke('getWeatherByCity', city),
  getSupportedCities: () => ipcRenderer.invoke('getSupportedCities'),

  // 行程日历相关
  getAllSchedules: () => ipcRenderer.invoke('getAllSchedules'),
  getSchedulesByDate: (date: string) => ipcRenderer.invoke('getSchedulesByDate', date),
  getSchedulesByMonth: (year: number, month: number) => ipcRenderer.invoke('getSchedulesByMonth', year, month),
  createSchedule: (schedule: any) => ipcRenderer.invoke('createSchedule', schedule),
  updateSchedule: (id: string, schedule: any) => ipcRenderer.invoke('updateSchedule', id, schedule),
  deleteSchedule: (id: string) => ipcRenderer.invoke('deleteSchedule', id),

  // 我的待办相关
  getAllTodos: () => ipcRenderer.invoke('getAllTodos'),
  getTodoById: (id: string) => ipcRenderer.invoke('getTodoById', id),
  getTodosByFilter: (filter: 'all' | 'active' | 'completed') => ipcRenderer.invoke('getTodosByFilter', filter),
  createTodo: (todo: any) => ipcRenderer.invoke('createTodo', todo),
  updateTodo: (id: string, todo: any) => ipcRenderer.invoke('updateTodo', id, todo),
  toggleTodo: (id: string) => ipcRenderer.invoke('toggleTodo', id),
  deleteTodo: (id: string) => ipcRenderer.invoke('deleteTodo', id),
  getTodoStatistics: () => ipcRenderer.invoke('getTodoStatistics'),

  // 个人资料相关
  getProfile: () => ipcRenderer.invoke('getProfile'),
  updateProfile: (profile: any) => ipcRenderer.invoke('updateProfile', profile),
  getUserStatistics: () => ipcRenderer.invoke('getUserStatistics'),
  updateAvatar: (avatar: string) => ipcRenderer.invoke('updateAvatar', avatar),
}