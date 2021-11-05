import fs from 'fs'
import forge from 'node-forge'
import { getRepository } from 'typeorm'

import { CERT_PATH } from '../constants'
import { Certificate } from '../app/entity'

export const storeCertificate = async (
  fileNameSufix: string
): Promise<void> => {
  const certificateRepo = getRepository(Certificate)

  const pemCert = fs
    .readFileSync(`${CERT_PATH}/cert-${fileNameSufix}.pem`)
    .toString()

  const { serialNumber } = forge.pki.certificateFromPem(pemCert)

  const certificate = certificateRepo.create({ serialNumber })

  await certificateRepo.save(certificate)

  console.log(
    `LISTA DE SERIAL NUMBERS: ${(await certificateRepo.find())
      .map(certificate => certificate.serialNumber)
      .join(', ')}`
  )
}
