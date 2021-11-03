import { exec } from 'child_process'

import { RootCAOptions } from '@javascript-cerficate-and-oauth/typings'

export const generateRootCA = ({
  password,
  countryName,
  stateOrProvinceName,
  localityName,
  organizationUnitName,
  commonName,
  emailAddress
}: RootCAOptions): void => {
  exec(
    `openssl req -x509 -newkey rsa:4096 -passout pass:${password} -keyout cakey.pem -out cacert.pem -passin pass:${password} -days 365 -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/OU=${organizationUnitName}/CN=${commonName}/emailAddress=${emailAddress}"`,
    (error, _, stderr) => {
      if (stderr || error) {
        console.log(`Erro ao gerar Root CA: ${stderr ?? error.message}`)
        return
      }

      console.log('Root CA gerado com sucesso!')
    }
  )
}
