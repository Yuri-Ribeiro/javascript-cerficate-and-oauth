import { getRepository } from 'typeorm'

import {
  Request,
  Response,
  RegisterToCRLRequest,
  RegisterToCRLResponse,
  GetCRLResponse
} from '@javascript-cerficate-and-oauth/typings'

import { Certificate, CRLItem } from '../entity'

export class CRL {
  static registerToCRL = async (
    req: Request<RegisterToCRLRequest>,
    res: Response<RegisterToCRLResponse>
  ): Promise<void> => {
    const { serialNumber } = req.body

    const certificate = await getRepository(Certificate).findOne({
      where: { serialNumber },
      relations: ['CRLItem']
    })

    if (!certificate) {
      res.status(404).send('certificado não identificado')

      return
    }

    if (certificate.CRLItem) {
      res.status(400).send('certificado já revogado')

      return
    }

    const CRLItemRepository = getRepository(CRLItem)

    const CRLItemToBeSaved = CRLItemRepository.create({
      certificate
    })
    await CRLItemRepository.save(CRLItemToBeSaved)

    const CRL = await CRLItemRepository.find()

    res.status(200).send(CRL.map(CRLItem => CRLItem.certificate.serialNumber))
  }

  static getCRL = async (
    req: Request,
    res: Response<GetCRLResponse>
  ): Promise<void> => {
    const CRL = await getRepository(CRLItem).find()

    res.status(200).send(CRL.map(CRLItem => CRLItem.certificate.serialNumber))
  }
}
