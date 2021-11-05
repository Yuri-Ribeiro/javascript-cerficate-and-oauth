import { Request, Response } from '@javascript-cerficate-and-oauth/typings'

import { getRepository } from 'typeorm'

import { CERT_PATH } from '../../constants'

import { CRLItem } from '../../app/entity/CRL'

import { storeCertificate } from '../../helpers'

import { generateCSR, signCSR } from '../../utils'

export class Certification {
  static emitCertificateController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const fileNameSufix = `${
      req.body.organizationName
    }-${new Date().toISOString()}`

    await generateCSR(fileNameSufix, req.body)

    await signCSR(fileNameSufix)

    storeCertificate(fileNameSufix)

    res.status(200).download(`${CERT_PATH}/cert-${fileNameSufix}.pem`)
  }

  static getCRL = async (req: Request, res: Response): Promise<void> => {
    const certificateRepo = getRepository(CRLItem)

    const CRL = await certificateRepo.find()

    res.status(200).send(CRL)
  }
}
