import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { SysRole } from './sys-role.entity'

@Entity('sys_user')
export class SysUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50, unique: true })
  username: string

  @Column({ length: 100 })
  password: string

  @Column({ length: 50, nullable: true })
  nickname: string

  @Column({ length: 100, nullable: true, unique: true })
  email: string

  @Column({ length: 20, nullable: true, unique: true })
  phone: string

  @Column({ length: 255, nullable: true })
  avatar: string

  @Column({ default: 0 })
  gender: number

  @Column({ default: 1 })
  status: number

  @Column({ default: 1 })
  is_active: number

  @Column({ type: 'datetime', nullable: true })
  last_login_time: Date

  @Column({ length: 50, nullable: true })
  last_login_ip: string

  @Column({ default: 0 })
  login_count: number

  @Column({ length: 50, nullable: true })
  create_by: string

  @CreateDateColumn()
  create_time: Date

  @Column({ length: 50, nullable: true })
  update_by: string

  @UpdateDateColumn()
  update_time: Date

  @Column({ length: 500, nullable: true })
  remark: string

  @ManyToMany(() => SysRole)
  @JoinTable({
    name: 'sys_user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: SysRole[]
}
