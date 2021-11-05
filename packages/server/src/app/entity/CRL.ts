import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne
} from 'typeorm'

import { Certificate } from './Certificate'

@Entity('CRL')
export class CRLItem {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Certificate)
  certificate: Certificate

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
