import {
  CertificateSubjectOptions,
  Request,
  Response
} from '@javascript-cerficate-and-oauth/typings'

import { CERT_PATH } from '../../constants'

import { storeCertificate, generateCSR, signCSR } from '../../helpers'

export class Certificate {
  static emitCertificateController = async (
    req: Request<CertificateSubjectOptions>,
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
}
