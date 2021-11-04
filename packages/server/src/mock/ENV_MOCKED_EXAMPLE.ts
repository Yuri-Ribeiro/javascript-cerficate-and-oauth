import { CertSubjectOptions } from '@javascript-cerficate-and-oauth/typings'

export const MOCKED_ROOT_CA_OPTIONS: CertSubjectOptions = {
  password: '123456',
  countryName: 'BR',
  stateOrProvinceName: 'Ceará',
  localityName: 'Fortaleza',
  organizationName: 'Teste',
  organizationUnitName: 'Teste',
  commonName: 'localhost',
  emailAddress: 'teste@email.address'
}
