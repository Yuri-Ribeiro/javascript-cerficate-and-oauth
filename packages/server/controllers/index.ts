import { Request, Response } from '@javascript-cerficate-and-oauth/typings'

export class Certification {
  static emitCertificateController = (req: Request, res: Response): void => {
    res.status(200).send('emitedCertificate')
  }
}
