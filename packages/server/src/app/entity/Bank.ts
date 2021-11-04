import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('CRLItem')
export class CRLItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  serial: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  @DeleteDateColumn()
  deletedAt: Date
}
