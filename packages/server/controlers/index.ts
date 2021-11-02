import { Request, Response } from 'express'

export class Certification {
  static emitCertificate = (req: Request, res: Response) => {
    res.status(200).send('emitedCertificate')
  }
}
