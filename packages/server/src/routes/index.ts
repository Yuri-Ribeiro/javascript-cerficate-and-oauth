import express from 'express'

import { Certification } from '../app/controllers'

const routes = express.Router()

routes.post('/emitCertificate', Certification.emitCertificateController)

routes.get('/CRL', Certification.getCRL)

export default routes
