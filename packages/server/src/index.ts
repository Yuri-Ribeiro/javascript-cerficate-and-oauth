import cors from 'cors'
import express from 'express'
import { checkForRootCA } from './utils'

import { createConnection } from 'typeorm'
import 'reflect-metadata'

import routes from './routes'

const app = express()

const PORT = 4000

checkForRootCA()

app.use(cors())
app.use(express.json())

app.use(routes)

createConnection().then(() => {
  console.log('📚 Conexão bem-sucedida com banco de dados')

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
})
