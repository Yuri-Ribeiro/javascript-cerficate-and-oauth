import { exec } from 'child_process'

import { existsSync, mkdirSync } from 'fs'

import { CertSubjectOptions } from '@javascript-cerficate-and-oauth/typings'

import { CSR_PATH } from '../src/constants'

export const generateCSR = ({
  password,
  countryName,
  stateOrProvinceName,
  localityName,
  organizationName,
  organizationUnitName,
  commonName,
  emailAddress
}: CertSubjectOptions): void => {
  if (!existsSync(CSR_PATH)) mkdirSync(CSR_PATH, { recursive: true })

  exec(
    `openssl req -new -newkey rsa:4096 -passout pass:${password} -keyout ${CSR_PATH}/key.pem -out ${CSR_PATH}/csr.pem -passin pass:${password} -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/O=${organizationName}/OU=${organizationUnitName}/CN=${commonName}/emailAddress=${emailAddress}"`,
    (error, _, stderr) => {
      if (error) {
        console.log(`Erro ao gerar CSR: ${error.message}`)
        return
      }

      if (stderr) console.log(`Saída: ${stderr}`)

      console.log('CSR gerado com sucesso!')
    }
  )
}
