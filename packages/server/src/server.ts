// necessário para os decorators do TypeORM
import 'reflect-metadata'

import express from 'express'
import { createConnection } from 'typeorm'

import { checkForRootCA } from './helpers'
import routes from './routes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const app = express()
const PORT = 4000

app.use(express.json())

app.use(routes)

Promise.all([checkForRootCA(), createConnection()])
  .then(() => {
    console.log('📚 Conexão bem-sucedida com banco de dados')

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch(console.log)
