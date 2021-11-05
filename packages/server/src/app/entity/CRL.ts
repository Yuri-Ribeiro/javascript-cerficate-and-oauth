import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

import { Certificate } from './Certificate'

@Entity('crl_item')
export class CRLItem {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Certificate, { nullable: false })
  certificate: Certificate
}
