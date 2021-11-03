import { Request, Response } from '@javascript-cerficate-and-oauth/typings'

export class Certification {
  static emitCertificate = (req: Request, res: Response) => {
    res.status(200).send('emitedCertificate')
  }
}
