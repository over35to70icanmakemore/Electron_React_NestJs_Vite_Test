import { ConfigProviderProps } from 'antd'

// 工业风格主题配置
export const industrialTheme: ConfigProviderProps['theme'] = {
  token: {
    // 主色调 - 深蓝色，符合工业风格
    colorPrimary: '#007bff',
    colorPrimaryHover: '#0069d9',
    colorPrimaryActive: '#005cbf',
    
    // 辅助色
    colorSuccess: '#28a745',
    colorWarning: '#ffc107',
    colorError: '#dc3545',
    colorInfo: '#17a2b8',
    
    // 背景色
    colorBgLayout: '#f8f9fa',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#fafafa',
    
    // 文字颜色
    colorTextBase: '#212529',
    colorTextSecondary: '#495057',
    colorTextTertiary: '#6c757d',
    colorTextQuaternary: '#adb5bd',
    
    // 边框颜色
    colorBorder: '#dee2e6',
    colorBorderSecondary: '#e9ecef',
    
    // 字体
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: 12,
    fontSizeLG: 14,
    fontSizeXL: 16,
    
    // 间距
    lineHeight: 1.6,
    marginXS: 4,
    margin: 8,
    marginSM: 16,
    marginLG: 24,
    marginXL: 32,
    
    // 圆角
    borderRadius: 4,
    borderRadiusLG: 6,
    borderRadiusSM: 3,
    
    // 阴影
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    // boxShadowHover 已移除，该属性不在 AliasToken 类型中
    
    // 表格
    colorFillAlter: '#f8f9fa',
    colorFillSecondary: '#e9ecef',
    
    // 按钮
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
  },
  components: {
    // 按钮组件样式
    Button: {
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 4,
    },
    
    // 表格组件样式
    Table: {
      headerBg: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
      headerColor: '#495057',
      headerSplitColor: 'transparent',
      rowHoverBg: '#f8f9fa',
      fontSize: 12,
    },
    
    // 卡片组件样式
    Card: {
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    
    // 表单组件样式
    Form: {
      // labelFontWeight 不是 Form 组件的合法属性，已移除
      labelColor: '#333',
    },
    
    // 输入框组件样式
    Input: {
      borderRadius: 4,
      fontSize: 14,
    },
    
    // 标签组件样式
    Tag: {
      borderRadius: 12,
      fontSize: 11,
    },
    
    // 选项卡组件样式
    Tabs: {
      fontSize: 12,
      // headerBg 不是 Tabs 组件的合法属性，已移除
      colorPrimary: '#007bff',
    },
  },
}
