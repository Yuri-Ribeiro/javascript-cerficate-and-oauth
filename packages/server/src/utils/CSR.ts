import { exec } from 'child_process'

import { existsSync, mkdirSync } from 'fs'

import { CertSubjectOptions } from '@javascript-cerficate-and-oauth/typings'

import { CERT_PATH, CSR_PATH, ROOT_CA_PATH } from '../constants'

import { MOCKED_ROOT_CA_OPTIONS } from '../mock'

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

export const signCSR = (): void => {
  if (!existsSync(CERT_PATH)) mkdirSync(CERT_PATH, { recursive: true })

  exec(
    `openssl x509 -req -in ${CSR_PATH}/csr.pem -days 365 -CA ${ROOT_CA_PATH}/cacert.pem -CAkey ${ROOT_CA_PATH}/cakey.pem -passin pass:${MOCKED_ROOT_CA_OPTIONS.password} -CAcreateserial -out ${CERT_PATH}/cert.pem`,
    (error, _, stderr) => {
      if (error) {
        console.log(`Erro ao assinar certificado: ${error.message}`)
        return
      }

      if (stderr) console.log(`Saída: ${stderr}`)

      console.log('Certificado assinado com sucesso!')
    }
  )
}
