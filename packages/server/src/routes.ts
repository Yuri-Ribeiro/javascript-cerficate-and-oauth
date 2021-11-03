import express from 'express'
import { Certification } from '../controllers'

const routes = express.Router()

routes.post('/emitCertificate', Certification.emitCertificate)

export default routes
