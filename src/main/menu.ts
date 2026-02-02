import { app, Menu, dialog } from 'electron'

const isMac = process.platform === 'darwin'

const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' as const },
      { type: 'separator' as const },
      { role: 'quit' as const }
    ]
  }] : []),
  {
    label: '文件',
    submenu: [
      { label: '新建', accelerator: 'CmdOrCtrl+N' },
      { label: '打开', accelerator: 'CmdOrCtrl+O' },
      { label: '保存', accelerator: 'CmdOrCtrl+S' },
      { type: 'separator' as const },
      { label: '重载框架', accelerator: 'CmdOrCtrl+R', click: () => {
          // 重载应用并确保进入登录页面
          // 先重新启动应用，再退出当前实例
          console.log('Clearing user info and restarting app...')
          app.relaunch()
          app.quit()
        } },
      { type: 'separator' as const },
      isMac ? { role: 'close' as const } : { role: 'quit' as const }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo' as const },
      { role: 'redo' as const },
      { type: 'separator' as const },
      { role: 'cut' as const },
      { role: 'copy' as const },
      { role: 'paste' as const },
      { type: 'separator' as const },
      { role: 'selectAll' as const }
    ]
  },
  {
    label: '考试管理',
    submenu: [
      { label: '考试列表', accelerator: 'CmdOrCtrl+1' },
      { label: '考生管理', accelerator: 'CmdOrCtrl+2' },
      { label: '试题库', accelerator: 'CmdOrCtrl+3' },
      { label: '成绩分析', accelerator: 'CmdOrCtrl+4' }
    ]
  },
  {
    label: '设置',
    submenu: [
      { label: '系统设置', accelerator: 'CmdOrCtrl+,' },
      { label: '考试设置' },
      { type: 'separator' as const },
      { label: '用户管理' }
    ]
  },
  {
    label: '帮助',
    submenu: [
      { label: '使用指南', accelerator: 'F1' },
      { type: 'separator' as const },
      { label: '关于', click: () => {
        dialog.showMessageBox({
          title: '关于',
          message: `本应用基于 Electron + React + NestJS 构建\n版本: ${app.getVersion()}`,
          buttons: ['确定']
        })
      }}
    ]
  }
]

const menu = Menu.buildFromTemplate(template)

export function setupMenu() {
  Menu.setApplicationMenu(menu)
}

export function updateMenu() {
  Menu.setApplicationMenu(menu)
}
