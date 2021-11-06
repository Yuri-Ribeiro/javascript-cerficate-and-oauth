import {
  CertificateSubjectOptions,
  Request,
  Response
} from '@javascript-cerficate-and-oauth/typings'

import superagent from 'superagent'

import { getRepository } from 'typeorm'

import { User } from '../entity/User'

const getUser = async (accessToken): Promise<any> => {
  const { body: user } = await superagent
    .get('https://api.github.com/user')
    .set('User-Agent', 'request')
    .set('Authorization', `token ${accessToken}`)

  return user
}

export class GitHub {
  static authorizationCallback = async (
    req: Request<CertificateSubjectOptions>,
    res: Response
  ): Promise<void> => {
    const { CLIENT_ID, CLIENT_SECRET } = process.env

    console.log(CLIENT_ID, CLIENT_SECRET)

    const { code } = req.query

    if (!code) {
      res.status(400).send('No code provided')

      return
    }

    superagent
      .post('https://github.com/login/oauth/access_token')
      .send({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      })
      .set('Accept', 'application/json')
      .then(async result => {
        const userRepository = getRepository(User)
        const token = result.body.access_token

        console.log('token', token)

        const user = userRepository.create({ token })
        await userRepository.save(user)

        const users = await userRepository.find()

        const foundUser = await getUser(token)

        res.send(
          `<h3>TOKEN ${token} SALVO COM SUCESSO NO BANCO</h3>
          </br>
          <b>Tokens salvos no banco:</b> ${users
            .map(user => `</br><i>${user.token}</i>`)
            .join(', ')}
          </br>
          </br>
          </br>
          <h3>EXEMPLO DE USO FAZENDO REQUISIÇÃO COM TOKEN NO GITHUB API:</h3>${JSON.stringify(
            foundUser
          )}`
        )
      })
      .catch(err => {
        console.log('err----', err)
      })
  }
}
