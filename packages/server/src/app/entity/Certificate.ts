import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('certificate')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  serialNumber: string
}
