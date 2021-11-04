import { existsSync, mkdirSync } from 'fs'

import { CertSubjectOptions } from '@javascript-cerficate-and-oauth/typings'

import { CERT_PATH, CSR_PATH, ROOT_CA_PATH } from '../constants'
import { MOCKED_ROOT_CA_OPTIONS } from '../mock'

import { exec } from '.'

export const generateCSR = async (
  fileNameSufix: string,
  {
    password,
    countryName,
    stateOrProvinceName,
    localityName,
    organizationName,
    organizationUnitName,
    commonName,
    emailAddress
  }: CertSubjectOptions
): Promise<void> => {
  try {
    if (!existsSync(CSR_PATH)) mkdirSync(CSR_PATH, { recursive: true })

    const { stderr } = await exec(
      `openssl req -new -newkey rsa:4096 -passout pass:${password} -keyout ${CSR_PATH}/key-${fileNameSufix}.pem -out ${CSR_PATH}/csr-${fileNameSufix}.pem -passin pass:${password} -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/O=${organizationName}/OU=${organizationUnitName}/CN=${commonName}/emailAddress=${emailAddress}"`
    )

    if (stderr) console.log(`Saída: ${stderr}`)

    console.log('CSR gerado com sucesso!')
  } catch (error) {
    console.log(`Erro ao gerar CSR: ${error.message}`)
  }
}

export const signCSR = async (fileNameSufix: string): Promise<void> => {
  try {
    if (!existsSync(CERT_PATH)) mkdirSync(CERT_PATH, { recursive: true })

    const { stderr } = await exec(
      `openssl x509 -req -in ${CSR_PATH}/csr-${fileNameSufix}.pem -days 365 -CA ${ROOT_CA_PATH}/cacert.pem -CAkey ${ROOT_CA_PATH}/cakey.pem -passin pass:${MOCKED_ROOT_CA_OPTIONS.password} -CAcreateserial -out ${CERT_PATH}/cert-${fileNameSufix}.pem`
    )

    if (stderr) console.log(`Saída: ${stderr}`)

    console.log('Certificado assinado com sucesso!')
  } catch (error) {
    console.log(`Erro ao assinar certificado: ${error.message}`)
  }
}
