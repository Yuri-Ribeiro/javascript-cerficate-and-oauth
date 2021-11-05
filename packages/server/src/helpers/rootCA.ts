import { existsSync, mkdirSync } from 'fs'

import { CertificateSubjectOptions } from '@javascript-cerficate-and-oauth/typings'

import { ROOT_CA_PATH } from '../constants'

import { MOCKED_ROOT_CA_OPTIONS } from '../mock'

import { exec } from '../utils'

export const generateRootCA = async ({
  password,
  countryName,
  stateOrProvinceName,
  localityName,
  organizationName,
  organizationUnitName,
  commonName,
  emailAddress
}: CertificateSubjectOptions): Promise<void> => {
  try {
    if (!existsSync(ROOT_CA_PATH)) mkdirSync(ROOT_CA_PATH, { recursive: true })

    const { stderr } = await exec(
      `openssl req -x509 -newkey rsa:4096 -passout pass:${password} -keyout ${ROOT_CA_PATH}/cakey.pem -out ${ROOT_CA_PATH}/cacert.pem -passin pass:${password} -days 365 -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/O=${organizationName}/OU=${organizationUnitName}/CN=${commonName}/emailAddress=${emailAddress}"`
    )

    if (stderr) console.log(`Saída: ${stderr}`)

    console.log('Root CA gerado com sucesso!')
  } catch (error) {
    console.log(`Erro ao gerar Root CA: ${error.message}`)
  }
}

export const checkForRootCA = async (): Promise<void> => {
  const rootCAExists = existsSync(`${ROOT_CA_PATH}/cacert.pem`)
  const rootCAKeyExists = existsSync(`${ROOT_CA_PATH}/cakey.pem`)

  if (rootCAExists && rootCAKeyExists) return

  await generateRootCA(MOCKED_ROOT_CA_OPTIONS)
}
