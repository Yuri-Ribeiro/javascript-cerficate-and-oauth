import cors from 'cors'
import express from 'express'
import { checkForRootCA } from '../utils'
import routes from './routes'

const app = express()

const PORT = 4000

checkForRootCA()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
