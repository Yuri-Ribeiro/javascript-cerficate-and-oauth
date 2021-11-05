import {
  CertificateSubjectOptions,
  Request,
  Response
} from '@javascript-cerficate-and-oauth/typings'

import superagent from 'superagent'

import { getRepository } from 'typeorm'

import { User } from '../entity/User'

const getUser = async (accessToken): Promise<any> => {
  return superagent
    .get('https://api.github.com/user')
    .set('Authorization', `token ${accessToken}`)
}

export class GitHub {
  static authorizationCallback = async (
    req: Request<CertificateSubjectOptions>,
    res: Response
  ): Promise<void> => {
    const { code } = req.query

    if (!code) {
      res.status(400).send('No code provided')

      return
    }

    superagent
      .post('https://github.com/login/oauth/access_token')
      .send({
        client_id: 'a2891c4f7582630a21ae',
        client_secret: 'f737feb147684f82d867be22e6295356eddf2c84',
        code
      })
      .set('Accept', 'application/json')
      .then(async result => {
        const userRepository = getRepository(User)
        const token = result.body.access_token

        const user = userRepository.create({ token })
        await userRepository.save(user)

        const users = await userRepository.find()
        console.log(users)

        const foundUser = await getUser(token)

        res.send(
          `TOKEN ${token} SALVO COM SUCESSO NO BANCO

EXEMPLO DE USO COM GITHUB API:
${foundUser}`
        )
      })
      .catch(err => {
        console.log('err----', err)
      })
  }
}
