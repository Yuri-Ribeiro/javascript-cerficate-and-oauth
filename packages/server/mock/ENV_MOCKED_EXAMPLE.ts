import { RootCAOptions } from '@javascript-cerficate-and-oauth/typings'

export const MOCKET_ROOT_CA_OPTIONS: RootCAOptions = {
  path: './env/rootCA',
  password: '123456',
  countryName: 'BR',
  stateOrProvinceName: 'Ceará',
  localityName: 'Fortaleza',
  organizationUnitName: 'Teste',
  commonName: 'localhost',
  emailAddress: 'teste@email.address'
}
