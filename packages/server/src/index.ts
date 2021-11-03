import express from 'express'
import cors from 'cors'
import routes from './routes'

import { generateCSR } from '../utils'

const app = express()

app.use(cors())
app.use(routes)

app.listen(4000, () => {
  generateCSR()

  console.log('Server running')
})
