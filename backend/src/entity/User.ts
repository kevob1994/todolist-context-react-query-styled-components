import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Task } from './Task'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Task, (task) => task.user)
  task: Task[]
}
