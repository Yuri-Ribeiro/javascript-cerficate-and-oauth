import { exec } from 'child_process'

import { existsSync } from 'fs'

import { RootCAOptions } from '@javascript-cerficate-and-oauth/typings'

import { MOCKED_ROOT_CA_OPTIONS } from '../mock'

export const generateRootCA = ({
  path,
  password,
  countryName,
  stateOrProvinceName,
  localityName,
  organizationUnitName,
  commonName,
  emailAddress
}: RootCAOptions): void => {
  exec(
    `openssl req -x509 -newkey rsa:4096 -passout pass:${password} -keyout ${path}/cakey.pem -out ${path}/cacert.pem -passin pass:${password} -days 365 -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/OU=${organizationUnitName}/CN=${commonName}/emailAddress=${emailAddress}"`,
    (error, _, stderr) => {
      if (error) {
        console.log(`Erro ao gerar Root CA: ${stderr ?? error.message}`)
        return
      }

      if (stderr) console.log(`Saída: ${stderr}`)

      console.log('Root CA gerado com sucesso!')
    }
  )
}

export const checkForRootCA = (): void => {
  const rootCAExists = existsSync(`${MOCKED_ROOT_CA_OPTIONS.path}/cacert.pem`)
  const rootCAKeyExists = existsSync(`${MOCKED_ROOT_CA_OPTIONS.path}/cakey.pem`)

  if (rootCAExists && rootCAKeyExists) return

  generateRootCA(MOCKED_ROOT_CA_OPTIONS)
}
