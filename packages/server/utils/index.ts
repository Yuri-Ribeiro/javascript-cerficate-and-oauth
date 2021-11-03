import { exec } from 'child_process'

import { existsSync } from 'fs'

import { RootCAOptions } from '@javascript-cerficate-and-oauth/typings'

import { MOCKET_ROOT_CA_OPTIONS } from '../mock'

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
      if (stderr || error) {
        console.log(`Erro ao gerar Root CA: ${stderr ?? error.message}`)
        return
      }

      console.log('Root CA gerado com sucesso!')
    }
  )
}

export const checkForRootCA = (): void => {
  if (!existsSync('./env/rootCA/cakey.pem')) return

  if (!existsSync('./env/rootCA/cacert.pem')) return

  generateRootCA(MOCKET_ROOT_CA_OPTIONS)
}
