import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('sys_role')
export class SysRole {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 50 })
  role_name: string

  @Column({ length: 50, unique: true })
  role_code: string

  @Column({ default: 0 })
  sort: number

  @Column({ default: 1 })
  status: number

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
}
