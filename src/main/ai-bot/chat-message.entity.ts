import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  role: string

  @Column('text')
  content: string

  @CreateDateColumn()
  timestamp: Date
}
