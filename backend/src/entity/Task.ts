import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm'
import { User } from './User'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  text: string

  @Column()
  done?: boolean

  @ManyToOne(() => User, (user) => user.task, {
    cascade: true,
  })
  @JoinTable()
  user?: User
}
