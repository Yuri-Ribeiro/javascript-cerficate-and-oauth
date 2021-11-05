import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'

import { Certificate } from './Certificate'

@Entity()
export class CRLItem {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Certificate, certificate => certificate.CRLItem, {
    nullable: false,
    eager: true
  })
  @JoinColumn()
  certificate: Certificate
}
