import forge from 'node-forge'
import fs from 'fs'

import { CERT_PATH } from '../constants'
import { getRepository } from 'typeorm'

import { Certificate } from '../app/entity/Certificate'

export const storeCertificate = async (
  fileNameSufix: string
): Promise<void> => {
  const certificateRepo = getRepository(Certificate)

  const pemCert = fs
    .readFileSync(`${CERT_PATH}/cert-${fileNameSufix}.pem`)
    .toString()

  console.log(pemCert)

  const { serialNumber } = forge.pki.certificateFromPem(pemCert)

  const certificate = certificateRepo.create({ serialNumber })

  await certificateRepo.save(certificate)
  console.log(await certificateRepo.find())
}
