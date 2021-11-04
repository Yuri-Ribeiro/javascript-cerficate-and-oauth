import { Request, Response } from '@javascript-cerficate-and-oauth/typings'

import { CERT_PATH } from '../../constants'

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

    res.status(200).download(`${CERT_PATH}/cert-${fileNameSufix}.pem`)
  }
}
