import express from 'express'

import { Certificate, CRL, GitHub } from '../app/controllers'

const routes = express.Router()

routes.post('/emitCertificate', Certificate.emitCertificateController)

routes.get('/CRL', CRL.getCRL)

routes.post('/registerToCRL', CRL.registerToCRL)

routes.get('/auth/callback', GitHub.authorizationCallback)

export default routes
