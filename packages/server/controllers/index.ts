import {
  RootCAOptions,
  Request,
  Response
} from '@javascript-cerficate-and-oauth/typings'

import { generateRootCA } from '../utils'

export class Certification {
  static generateRootCAController = (
    req: Request<RootCAOptions>,
    res: Response<string>
  ): void => {
    generateRootCA(req.body)

    res.status(200).send('Root CA gerado com sucesso!')
  }

  static emitCertificateController = (req: Request, res: Response): void => {
    res.status(200).send('emitedCertificate')
  }
}
