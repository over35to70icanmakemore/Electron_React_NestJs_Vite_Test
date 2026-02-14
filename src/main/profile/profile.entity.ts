import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  avatar: string

  @Column()
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  location: string

  @Column({ nullable: true })
  school: string

  @Column({ nullable: true })
  major: string

  @Column({ nullable: true })
  grade: string

  @Column('text', { nullable: true })
  bio: string

  @Column('simple-array', { nullable: true })
  achievements: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
