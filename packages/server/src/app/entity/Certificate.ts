import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'

import { CRLItem } from './CRLItem'

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  serialNumber: string

  @OneToOne(() => CRLItem, CRLItem => CRLItem.certificate)
  CRLItem?: CRLItem
}
