-- ============================================
-- 考试系统用户表结构和模拟数据
-- 数据库: exam_system
-- 生成日期: 2026-02-14
-- ============================================

-- 创建用户表
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(36) NOT NULL COMMENT '用户ID (UUID)',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `gender` tinyint DEFAULT 0 COMMENT '性别: 0-未知 1-男 2-女',
  `status` tinyint DEFAULT 1 COMMENT '状态: 0-禁用 1-启用',
  `is_active` tinyint DEFAULT 1 COMMENT '是否激活: 0-未激活 1-已激活',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '最后登录IP',
  `login_count` int DEFAULT 0 COMMENT '登录次数',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`),
  UNIQUE KEY `uk_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统用户表';

-- ============================================
-- 创建用户角色关联表
-- ============================================

DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` varchar(36) NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- ============================================
-- 用户模拟数据
-- 密码均为: 123456 (MD5加密: e10adc3949ba59abbe56e057f20f883e)
-- ============================================

INSERT INTO `sys_user` (`id`, `username`, `password`, `nickname`, `email`, `phone`, `avatar`, `gender`, `status`, `is_active`, `last_login_time`, `last_login_ip`, `login_count`, `remark`) VALUES
-- 超级管理员
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '系统管理员', 'admin@example.com', '13800000001', '/avatars/admin.png', 1, 1, 1, '2026-02-14 10:00:00', '192.168.1.100', 156, '超级管理员账号'),

-- 考试管理员
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'exam_admin', 'e10adc3949ba59abbe56e057f20f883e', '考试管理员', 'exam_admin@example.com', '13800000002', '/avatars/exam_admin.png', 1, 1, 1, '2026-02-14 09:30:00', '192.168.1.101', 89, '考试管理负责人'),

-- 教师
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'teacher001', 'e10adc3949ba59abbe56e057f20f883e', '张老师', 'zhanglaoshi@example.com', '13800000011', '/avatars/teacher001.png', 1, 1, 1, '2026-02-14 08:45:00', '192.168.1.110', 45, '数学教师'),
('d4e5f6a7-b8c9-0123-def0-234567890123', 'teacher002', 'e10adc3949ba59abbe56e057f20f883e', '李老师', 'lilaoshi@example.com', '13800000012', '/avatars/teacher002.png', 2, 1, 1, '2026-02-13 16:20:00', '192.168.1.111', 38, '英语教师'),
('e5f6a7b8-c9d0-1234-ef01-345678901234', 'teacher003', 'e10adc3949ba59abbe56e057f20f883e', '王老师', 'wanglaoshi@example.com', '13800000013', '/avatars/teacher003.png', 1, 1, 1, '2026-02-13 14:00:00', '192.168.1.112', 52, '物理教师'),
('f6a7b8c9-d0e1-2345-f012-456789012345', 'teacher004', 'e10adc3949ba59abbe56e057f20f883e', '赵老师', 'zhaolaoshi@example.com', '13800000014', '/avatars/teacher004.png', 2, 1, 1, '2026-02-12 10:30:00', '192.168.1.113', 27, '化学教师'),
('a7b8c9d0-e1f2-3456-0123-567890123456', 'teacher005', 'e10adc3949ba59abbe56e057f20f883e', '刘老师', 'liulaoshi@example.com', '13800000015', '/avatars/teacher005.png', 1, 1, 1, '2026-02-14 07:15:00', '192.168.1.114', 61, '语文教师'),

-- 学生
('b8c9d0e1-f2a3-4567-1234-678901234567', 'student001', 'e10adc3949ba59abbe56e057f20f883e', '张三', 'zhangsan@example.com', '13800000101', '/avatars/student001.png', 1, 1, 1, '2026-02-14 11:00:00', '192.168.1.201', 23, '计算机科学与技术专业学生'),
('c9d0e1f2-a3b4-5678-2345-789012345678', 'student002', 'e10adc3949ba59abbe56e057f20f883e', '李四', 'lisi@example.com', '13800000102', '/avatars/student002.png', 1, 1, 1, '2026-02-14 10:30:00', '192.168.1.202', 18, '软件工程专业学生'),
('d0e1f2a3-b4c5-6789-3456-890123456789', 'student003', 'e10adc3949ba59abbe56e057f20f883e', '王五', 'wangwu@example.com', '13800000103', '/avatars/student003.png', 1, 1, 1, '2026-02-13 20:00:00', '192.168.1.203', 31, '数据科学专业学生'),
('e1f2a3b4-c5d6-7890-4567-901234567890', 'student004', 'e10adc3949ba59abbe56e057f20f883e', '赵六', 'zhaoliu@example.com', '13800000104', '/avatars/student004.png', 2, 1, 1, '2026-02-13 19:45:00', '192.168.1.204', 15, '人工智能专业学生'),
('f2a3b4c5-d6e7-8901-5678-012345678901', 'student005', 'e10adc3949ba59abbe56e057f20f883e', '钱七', 'qianqi@example.com', '13800000105', '/avatars/student005.png', 1, 1, 1, '2026-02-14 09:00:00', '192.168.1.205', 42, '网络工程专业学生'),
('a3b4c5d6-e7f8-9012-6789-123456789012', 'student006', 'e10adc3949ba59abbe56e057f20f883e', '孙八', 'sunba@example.com', '13800000106', '/avatars/student006.png', 1, 1, 1, '2026-02-12 15:30:00', '192.168.1.206', 28, '信息安全专业学生'),
('b4c5d6e7-f8a9-0123-7890-234567890123', 'student007', 'e10adc3949ba59abbe56e057f20f883e', '周九', 'zhoujiu@example.com', '13800000107', '/avatars/student007.png', 2, 1, 1, '2026-02-14 08:00:00', '192.168.1.207', 35, '物联网工程专业学生'),
('c5d6e7f8-a9b0-1234-8901-345678901234', 'student008', 'e10adc3949ba59abbe56e057f20f883e', '吴十', 'wushi@example.com', '13800000108', '/avatars/student008.png', 1, 1, 1, '2026-02-13 17:00:00', '192.168.1.208', 19, '大数据专业学生'),
('d6e7f8a9-b0c1-2345-9012-456789012345', 'student009', 'e10adc3949ba59abbe56e057f20f883e', '郑十一', 'zhengshiyi@example.com', '13800000109', '/avatars/student009.png', 1, 1, 1, '2026-02-14 06:30:00', '192.168.1.209', 56, '电子信息专业学生'),
('e7f8a9b0-c1d2-3456-0123-567890123456', 'student010', 'e10adc3949ba59abbe56e057f20f883e', '冯十二', 'fengshier@example.com', '13800000110', '/avatars/student010.png', 2, 1, 1, '2026-02-13 21:00:00', '192.168.1.210', 22, '通信工程专业学生'),

-- 禁用/未激活用户示例
('f8a9b0c1-d2e3-4567-1234-678901234567', 'disabled_user', 'e10adc3949ba59abbe56e057f20f883e', '已禁用用户', 'disabled@example.com', '13800000201', NULL, 0, 0, 1, NULL, NULL, 0, '已禁用的测试账号'),
('a9b0c1d2-e3f4-5678-2345-789012345678', 'inactive_user', 'e10adc3949ba59abbe56e057f20f883e', '未激活用户', 'inactive@example.com', '13800000202', NULL, 0, 1, 0, NULL, NULL, 0, '未激活的测试账号');

-- ============================================
-- 用户角色关联模拟数据
-- ============================================

-- 超级管理员 (角色ID: 1)
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1);

-- 考试管理员 (角色ID: 2)
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 2);

-- 教师 (角色ID: 3)
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 3),
('d4e5f6a7-b8c9-0123-def0-234567890123', 3),
('e5f6a7b8-c9d0-1234-ef01-345678901234', 3),
('f6a7b8c9-d0e1-2345-f012-456789012345', 3),
('a7b8c9d0-e1f2-3456-0123-567890123456', 3);

-- 学生 (角色ID: 4)
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES
('b8c9d0e1-f2a3-4567-1234-678901234567', 4),
('c9d0e1f2-a3b4-5678-2345-789012345678', 4),
('d0e1f2a3-b4c5-6789-3456-890123456789', 4),
('e1f2a3b4-c5d6-7890-4567-901234567890', 4),
('f2a3b4c5-d6e7-8901-5678-012345678901', 4),
('a3b4c5d6-e7f8-9012-6789-123456789012', 4),
('b4c5d6e7-f8a9-0123-7890-234567890123', 4),
('c5d6e7f8-a9b0-1234-8901-345678901234', 4),
('d6e7f8a9-b0c1-2345-9012-456789012345', 4),
('e7f8a9b0-c1d2-3456-0123-567890123456', 4);

-- ============================================
-- 验证数据
-- ============================================

SELECT '用户表数据:' AS '表名';
SELECT COUNT(*) AS '用户总数' FROM `sys_user`;
SELECT 
  CASE gender WHEN 1 THEN '男' WHEN 2 THEN '女' ELSE '未知' END AS '性别',
  COUNT(*) AS '人数'
FROM `sys_user` GROUP BY gender;

SELECT '各角色用户数量:' AS '统计';
SELECT 
  r.role_name AS '角色名称',
  COUNT(ur.user_id) AS '用户数量'
FROM `sys_role` r
LEFT JOIN `sys_user_role` ur ON r.id = ur.role_id
GROUP BY r.id, r.role_name;

SELECT '用户详情:' AS '详情';
SELECT 
  u.username AS '用户名',
  u.nickname AS '昵称',
  u.email AS '邮箱',
  u.phone AS '手机号',
  CASE u.status WHEN 1 THEN '启用' ELSE '禁用' END AS '状态',
  GROUP_CONCAT(r.role_name) AS '角色'
FROM `sys_user` u
LEFT JOIN `sys_user_role` ur ON u.id = ur.user_id
LEFT JOIN `sys_role` r ON ur.role_id = r.id
GROUP BY u.id
ORDER BY u.create_time;
