import { ConfigProviderProps } from 'antd'

// 腾讯管家风格主题配置
export const industrialTheme: ConfigProviderProps['theme'] = {
  token: {
    // 主色调 - 蓝色渐变，符合腾讯管家风格
    colorPrimary: '#4a90e2',
    colorPrimaryHover: '#357abd',
    colorPrimaryActive: '#2868a8',
    
    // 辅助色
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // 背景色
    colorBgLayout: '#f5f7fa',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#fafafa',
    
    // 文字颜色
    colorTextBase: '#333333',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
    colorTextQuaternary: '#bfbfbf',
    
    // 边框颜色
    colorBorder: '#e8e8e8',
    colorBorderSecondary: '#f0f0f0',
    
    // 字体
    fontFamily: '"Microsoft YaHei", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 18,
    
    // 间距
    lineHeight: 1.6,
    marginXS: 4,
    margin: 8,
    marginSM: 16,
    marginLG: 24,
    marginXL: 32,
    
    // 圆角 - 更圆润的设计
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // 阴影
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 4px 20px rgba(0, 0, 0, 0.12)',
    
    // 表格
    colorFillAlter: '#fafafa',
    colorFillSecondary: '#f5f7fa',
    
    // 按钮
    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 28,
    
    // 动画
    motionDurationFast: '0.2s',
    motionDurationMid: '0.3s',
    motionDurationSlow: '0.5s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    motionEaseOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    motionEaseIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  components: {
    // 按钮组件样式
    Button: {
      fontSize: 14,
      fontWeight: 500,
      borderRadius: 8,
      controlHeight: 36,
      primaryShadow: '0 2px 8px rgba(74, 144, 226, 0.3)',
      defaultShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      dangerShadow: '0 2px 8px rgba(255, 77, 79, 0.3)',
    },
    
    // 表格组件样式
    Table: {
      headerBg: '#f8f9fa',
      headerColor: '#333333',
      headerSplitColor: 'transparent',
      rowHoverBg: '#f5f7fa',
      fontSize: 14,
      borderRadiusLG: 12,
    },
    
    // 卡片组件样式
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: '0 2px 12px rgba(0, 0, 0, 0.08)',
      paddingLG: 24,
    },
    
    // 表单组件样式
    Form: {
      labelColor: '#333333',
      labelFontSize: 14,
      labelHeight: 32,
    },
    
    // 输入框组件样式
    Input: {
      borderRadius: 8,
      fontSize: 14,
      paddingBlock: 12,
      paddingInline: 16,
      activeShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
    },
    
    // 选择器组件样式
    Select: {
      borderRadius: 8,
      optionSelectedBg: '#f5f7fa',
    },
    
    // 标签组件样式
    Tag: {
      borderRadiusSM: 12,
      fontSize: 12,
      defaultBg: '#f5f7fa',
    },
    
    // 选项卡组件样式
    Tabs: {
      fontSize: 14,
      colorPrimary: '#4a90e2',
      borderRadiusLG: 8,
    },
    
    // 菜单组件样式
    Menu: {
      fontSize: 14,
      itemBg: 'transparent',
      itemHoverBg: 'rgba(255, 255, 255, 0.15)',
      itemSelectedBg: 'rgba(255, 255, 255, 0.25)',
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverColor: '#ffffff',
      itemSelectedColor: '#ffffff',
      borderRadiusLG: 8,
    },
    
    // 模态框组件样式
    Modal: {
      borderRadiusLG: 12,
      paddingContentHorizontalLG: 24,
    },
    
    // 消息提示组件样式
    Message: {
      borderRadiusLG: 8,
    },
    
    // 通知组件样式
    Notification: {
      borderRadiusLG: 12,
    },
    
    // 日期选择器组件样式
    DatePicker: {
      borderRadius: 8,
      borderRadiusLG: 12,
    },
    
    // 分页组件样式
    Pagination: {
      borderRadius: 8,
      itemActiveBg: '#4a90e2',
    },
    
    // 开关组件样式
    Switch: {
      colorPrimary: '#4a90e2',
      colorPrimaryHover: '#357abd',
    },
    
    // 复选框组件样式
    Checkbox: {
      borderRadiusSM: 4,
      colorPrimary: '#4a90e2',
    },
    
    // 单选框组件样式
    Radio: {
      borderRadiusSM: 4,
      colorPrimary: '#4a90e2',
    },
    
    // 进度条组件样式
    Progress: {
      defaultColor: '#4a90e2',
      remainingColor: '#f0f0f0',
    },
    
    // 徽标组件样式
    Badge: {
      colorError: '#ff4d4f',
    },
    
    // 头像组件样式
    Avatar: {
      borderRadius: 8,
    },
    
    // 工具提示组件样式
    Tooltip: {
      borderRadiusLG: 8,
    },
    
    // 抽屉组件样式
    Drawer: {
      borderRadiusLG: 12,
    },
    
    // 面包屑组件样式
    Breadcrumb: {
      fontSize: 14,
      itemColor: '#666666',
      lastItemColor: '#333333',
    },
    
    // 步骤条组件样式
    Steps: {
      colorPrimary: '#4a90e2',
      navArrowColor: '#999999',
    },
    
    // 时间轴组件样式
    Timeline: {
      dotBg: '#4a90e2',
    },
    
    // 树形控件组件样式
    Tree: {
      borderRadiusLG: 8,
      nodeSelectedBg: '#f5f7fa',
    },
    
    // 上传组件样式
    Upload: {
      borderRadiusLG: 8,
    },
    
    // 空状态组件样式
    Empty: {
      colorText: '#999999',
      colorTextDisabled: '#bfbfbf',
    },
  },
}