-- ============================================
-- 考试系统菜单表结构和模拟数据
-- 数据库: exam_system
-- 生成日期: 2026-02-14
-- ============================================

-- 创建菜单表
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `parent_id` bigint DEFAULT NULL COMMENT '父级菜单ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `menu_code` varchar(50) DEFAULT NULL COMMENT '菜单编码',
  `path` varchar(200) DEFAULT NULL COMMENT '路由路径',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `color` varchar(20) DEFAULT NULL COMMENT '颜色',
  `menu_type` tinyint NOT NULL DEFAULT 1 COMMENT '菜单类型: 1-目录 2-菜单 3-按钮',
  `sort` int DEFAULT 0 COMMENT '排序',
  `visible` tinyint DEFAULT 1 COMMENT '是否可见: 0-隐藏 1-显示',
  `status` tinyint DEFAULT 1 COMMENT '状态: 0-禁用 1-启用',
  `permission` varchar(100) DEFAULT NULL COMMENT '权限标识',
  `accelerator` varchar(50) DEFAULT NULL COMMENT '快捷键',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统菜单表';

-- ============================================
-- 一级菜单 - Electron原生菜单结构
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(1, NULL, '文件', 'file', NULL, 'FileOutlined', '文件操作菜单', NULL, 1, 1, 1, 1, NULL, NULL),
(2, NULL, '编辑', 'edit', NULL, 'EditOutlined', '编辑操作菜单', NULL, 1, 2, 1, 1, NULL, NULL),
(3, NULL, '设置', 'settings', NULL, 'SettingOutlined', '系统设置菜单', NULL, 1, 3, 1, 1, NULL, NULL),
(4, NULL, '帮助', 'help', NULL, 'QuestionCircleOutlined', '帮助信息菜单', NULL, 1, 4, 1, 1, NULL, NULL);

-- ============================================
-- 二级菜单 - 文件子菜单
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(101, 1, '新建', 'file_new', NULL, 'FileAddOutlined', '新建文件', NULL, 2, 1, 1, 1, 'file:new', 'CmdOrCtrl+N'),
(102, 1, '打开', 'file_open', NULL, 'FolderOpenOutlined', '打开文件', NULL, 2, 2, 1, 1, 'file:open', 'CmdOrCtrl+O'),
(103, 1, '保存', 'file_save', NULL, 'SaveOutlined', '保存文件', NULL, 2, 3, 1, 1, 'file:save', 'CmdOrCtrl+S'),
(104, 1, '重载框架', 'file_reload', NULL, 'ReloadOutlined', '重新加载应用', NULL, 2, 4, 1, 1, 'file:reload', 'CmdOrCtrl+R'),
(105, 1, '关闭', 'file_close', NULL, 'CloseOutlined', '关闭窗口', NULL, 2, 5, 1, 1, 'file:close', NULL);

-- ============================================
-- 二级菜单 - 编辑子菜单
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(201, 2, '撤销', 'edit_undo', NULL, 'UndoOutlined', '撤销操作', NULL, 2, 1, 1, 1, 'edit:undo', 'CmdOrCtrl+Z'),
(202, 2, '重做', 'edit_redo', NULL, 'RedoOutlined', '重做操作', NULL, 2, 2, 1, 1, 'edit:redo', 'CmdOrCtrl+Y'),
(203, 2, '剪切', 'edit_cut', NULL, 'ScissorOutlined', '剪切内容', NULL, 2, 3, 1, 1, 'edit:cut', 'CmdOrCtrl+X'),
(204, 2, '复制', 'edit_copy', NULL, 'CopyOutlined', '复制内容', NULL, 2, 4, 1, 1, 'edit:copy', 'CmdOrCtrl+C'),
(205, 2, '粘贴', 'edit_paste', NULL, 'SnippetsOutlined', '粘贴内容', NULL, 2, 5, 1, 1, 'edit:paste', 'CmdOrCtrl+V'),
(206, 2, '全选', 'edit_selectall', NULL, 'SelectOutlined', '全选内容', NULL, 2, 6, 1, 1, 'edit:selectall', 'CmdOrCtrl+A');

-- ============================================
-- 二级菜单 - 设置子菜单
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(301, 3, '系统设置', 'settings_system', '/settings', 'SettingOutlined', '配置系统参数选项', '#595959', 2, 1, 1, 1, 'settings:system', 'CmdOrCtrl+,'),
(302, 3, '考试设置', 'settings_exam', NULL, 'FileTextOutlined', '考试相关配置', NULL, 2, 2, 1, 1, 'settings:exam', NULL),
(303, 3, '用户管理', 'settings_user', '/users', 'UserOutlined', '管理系统用户权限', '#eb2f96', 2, 3, 1, 1, 'settings:user', NULL);

-- ============================================
-- 二级菜单 - 帮助子菜单
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(401, 4, '使用指南', 'help_guide', NULL, 'BookOutlined', '系统使用说明', NULL, 2, 1, 1, 1, 'help:guide', 'F1'),
(402, 4, '关于', 'help_about', NULL, 'InfoCircleOutlined', '关于系统', NULL, 2, 2, 1, 1, 'help:about', NULL);

-- ============================================
-- 桌面导航卡片菜单
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(1001, NULL, '我的考试', 'user_exams', '/user-exams', 'CalendarOutlined', '查看考试信息和预约情况', '#4a90e2', 2, 1, 1, 1, 'exam:view', NULL),
(1002, NULL, '考试管理', 'exams', '/exams', 'FileTextOutlined', '创建和管理考试项目', '#52c41a', 2, 2, 1, 1, 'exam:manage', NULL),
(1003, NULL, '考生管理', 'students', '/students', 'TeamOutlined', '管理考生信息和数据', '#fa8c16', 2, 3, 1, 1, 'student:manage', NULL),
(1004, NULL, '试题库', 'questions', '/questions', 'FileOutlined', '维护试题资源库', '#13c2c2', 2, 4, 1, 1, 'question:manage', NULL),
(1005, NULL, '成绩分析', 'scores', '/scores', 'BarChartOutlined', '统计和分析考试成绩', '#722ed1', 2, 5, 1, 1, 'score:view', NULL),
(1006, NULL, 'AI知识库', 'ai_knowledge', '/ai-knowledge', 'BookOutlined', '智能知识检索与学习', '#1890ff', 2, 6, 1, 1, 'ai:knowledge', NULL),
(1007, NULL, '智能机器人', 'ai_bot', '/ai-bot', 'RobotOutlined', 'AI智能问答助手', '#13c2c2', 2, 7, 1, 1, 'ai:bot', NULL),
(1008, NULL, '模拟练习', 'mock_exam', '/mock-exam', 'ThunderboltOutlined', '在线模拟考试练习', '#faad14', 2, 8, 1, 1, 'exam:mock', NULL),
(1009, NULL, '趣味问答', 'quiz', '/quiz', 'QuestionCircleOutlined', '趣味知识问答挑战', '#eb2f96', 2, 9, 1, 1, 'quiz:play', NULL),
(1010, NULL, '天气预报', 'weather', '/weather', 'CloudOutlined', '查看实时天气信息', '#36cfc9', 2, 10, 1, 1, 'weather:view', NULL),
(1011, NULL, '行程日历', 'schedule', '/schedule', 'ScheduleOutlined', '管理日程和安排', '#722ed1', 2, 11, 1, 1, 'schedule:manage', NULL),
(1012, NULL, '我的待办', 'todo', '/todo', 'CheckSquareOutlined', '管理待办事项清单', '#52c41a', 2, 12, 1, 1, 'todo:manage', NULL),
(1013, NULL, '个人资料', 'profile', '/profile', 'IdcardOutlined', '查看和编辑个人信息', '#fa8c16', 2, 13, 1, 1, 'profile:view', NULL);

-- ============================================
-- 功能按钮权限
-- ============================================

INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_code`, `path`, `icon`, `description`, `color`, `menu_type`, `sort`, `visible`, `status`, `permission`, `accelerator`) VALUES
(2001, 1002, '新增考试', 'exam_add', NULL, NULL, '创建新考试', NULL, 3, 1, 1, 1, 'exam:add', NULL),
(2002, 1002, '编辑考试', 'exam_edit', NULL, NULL, '编辑考试信息', NULL, 3, 2, 1, 1, 'exam:edit', NULL),
(2003, 1002, '删除考试', 'exam_delete', NULL, NULL, '删除考试', NULL, 3, 3, 1, 1, 'exam:delete', NULL),
(2004, 1002, '发布考试', 'exam_publish', NULL, NULL, '发布考试', NULL, 3, 4, 1, 1, 'exam:publish', NULL),
(2011, 1003, '新增考生', 'student_add', NULL, NULL, '添加考生', NULL, 3, 1, 1, 1, 'student:add', NULL),
(2012, 1003, '编辑考生', 'student_edit', NULL, NULL, '编辑考生信息', NULL, 3, 2, 1, 1, 'student:edit', NULL),
(2013, 1003, '删除考生', 'student_delete', NULL, NULL, '删除考生', NULL, 3, 3, 1, 1, 'student:delete', NULL),
(2014, 1003, '导入考生', 'student_import', NULL, NULL, '批量导入考生', NULL, 3, 4, 1, 1, 'student:import', NULL),
(2021, 1004, '新增试题', 'question_add', NULL, NULL, '添加试题', NULL, 3, 1, 1, 1, 'question:add', NULL),
(2022, 1004, '编辑试题', 'question_edit', NULL, NULL, '编辑试题', NULL, 3, 2, 1, 1, 'question:edit', NULL),
(2023, 1004, '删除试题', 'question_delete', NULL, NULL, '删除试题', NULL, 3, 3, 1, 1, 'question:delete', NULL),
(2024, 1004, '导入试题', 'question_import', NULL, NULL, '批量导入试题', NULL, 3, 4, 1, 1, 'question:import', NULL),
(2031, 1005, '导出成绩', 'score_export', NULL, NULL, '导出成绩报表', NULL, 3, 1, 1, 1, 'score:export', NULL),
(2032, 1005, '成绩统计', 'score_stats', NULL, NULL, '成绩统计分析', NULL, 3, 2, 1, 1, 'score:stats', NULL);

-- ============================================
-- 创建角色表
-- ============================================

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(50) NOT NULL COMMENT '角色名称',
  `role_code` varchar(50) NOT NULL COMMENT '角色编码',
  `sort` int DEFAULT 0 COMMENT '排序',
  `status` tinyint DEFAULT 1 COMMENT '状态: 0-禁用 1-启用',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统角色表';

-- ============================================
-- 角色模拟数据
-- ============================================

INSERT INTO `sys_role` (`id`, `role_name`, `role_code`, `sort`, `status`, `remark`) VALUES
(1, '超级管理员', 'admin', 1, 1, '拥有所有权限'),
(2, '考试管理员', 'exam_admin', 2, 1, '管理考试和试题'),
(3, '教师', 'teacher', 3, 1, '管理考生和查看成绩'),
(4, '学生', 'student', 4, 1, '参加考试和查看成绩');

-- ============================================
-- 创建角色菜单关联表
-- ============================================

DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_menu` (`role_id`, `menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单关联表';

-- ============================================
-- 角色菜单关联模拟数据 - 超级管理员拥有所有权限
-- ============================================

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, id FROM `sys_menu`;

-- ============================================
-- 角色菜单关联模拟数据 - 考试管理员
-- ============================================

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES
(2, 1), (2, 101), (2, 102), (2, 103), (2, 104), (2, 105),
(2, 2), (2, 201), (2, 202), (2, 203), (2, 204), (2, 205), (2, 206),
(2, 3), (2, 301), (2, 302),
(2, 4), (2, 401), (2, 402),
(2, 1001), (2, 1002), (2, 1003), (2, 1004), (2, 1005), (2, 1006), (2, 1007), (2, 1008),
(2, 2001), (2, 2002), (2, 2003), (2, 2004),
(2, 2011), (2, 2012), (2, 2013), (2, 2014),
(2, 2021), (2, 2022), (2, 2023), (2, 2024),
(2, 2031), (2, 2032);

-- ============================================
-- 角色菜单关联模拟数据 - 教师
-- ============================================

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES
(3, 1), (3, 101), (3, 102), (3, 103),
(3, 2), (3, 201), (3, 202), (3, 203), (3, 204), (3, 205), (3, 206),
(3, 4), (3, 401), (3, 402),
(3, 1001), (3, 1003), (3, 1005), (3, 1006), (3, 1007),
(3, 2011), (3, 2012), (3, 2013), (3, 2014),
(3, 2031), (3, 2032);

-- ============================================
-- 角色菜单关联模拟数据 - 学生
-- ============================================

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES
(4, 1), (4, 101), (4, 102), (4, 103),
(4, 2), (4, 201), (4, 202), (4, 203), (4, 204), (4, 205), (4, 206),
(4, 4), (4, 401), (4, 402),
(4, 1001), (4, 1006), (4, 1007), (4, 1008), (4, 1009), (4, 1010), (4, 1011), (4, 1012), (4, 1013);

-- ============================================
-- 验证数据
-- ============================================

SELECT '菜单表数据:' AS '表名';
SELECT COUNT(*) AS '菜单总数' FROM `sys_menu`;
SELECT menu_type, COUNT(*) AS '数量' FROM `sys_menu` GROUP BY menu_type;

SELECT '角色表数据:' AS '表名';
SELECT * FROM `sys_role`;

SELECT '角色菜单关联数据:' AS '表名';
SELECT r.role_name, COUNT(rm.menu_id) AS '菜单权限数量'
FROM `sys_role` r
LEFT JOIN `sys_role_menu` rm ON r.id = rm.role_id
GROUP BY r.id, r.role_name;
