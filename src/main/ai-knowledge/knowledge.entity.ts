import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('knowledge')
export class Knowledge {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  category: string

  @Column('text')
  summary: string

  @Column('text')
  content: string

  @Column('simple-array')
  tags: string[]

  @Column({ default: 0 })
  views: number

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}