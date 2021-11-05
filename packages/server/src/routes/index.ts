import express from 'express'

import { Certificate, CRL } from '../app/controllers'

const routes = express.Router()

routes.post('/emitCertificate', Certificate.emitCertificateController)

routes.get('/CRL', CRL.getCRL)

routes.post('/registerToCRL', CRL.registerToCRL)

export default routes
