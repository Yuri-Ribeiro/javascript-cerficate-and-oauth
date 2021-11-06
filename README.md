# Instruções

Essa aplicação é desenvolvida como um monorepo, portanto, em um único repositório, abriga tanto a aplicação web como o servidor.

## Executando

Para instalar as dependências da aplicação, basta, na raiz do projeto, executar:
##### `yarn install`

####Para executar o servidor:

Na pasta `packages/server`, execute: `yarn start`.

####Para executar a aplicação web:

Na pasta `packages/javascript-oauth`, execute: `yarn start`.

⚠️ Nos arquivos `.env` do servidor e da aplicação web, adicione as suas chaves do GitHub conforme os arquivos `.env_example`.

## Emitir certificado

`POST` em `localhost:4000/emitCertificate`

No corpo da requisição, mande um JSON:
```javascript
{
    "password": "123456",
    "countryName": "BR",
    "stateOrProvinceName": "Ceara",
    "localityName": "Fortaleza",
    "organizationName": "Teste",
    "organizationUnitName": "Teste",
    "commonName": "localhost",
    "emailAddress": "teste@email.address"
}
```

O download do certificado começará imediatamente.

## Registrar certificado na CRL

`POST` em `localhost:4000/registerToCRL`

No corpo da requisição, mande um JSON:
```javascript
{
    "serialNumber": "00c11af8afb2e15aae" 
}
```

## Listar CRL

`GET` em `localhost:4000/registerToCRL`