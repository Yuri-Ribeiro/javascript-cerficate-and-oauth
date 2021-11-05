import {
  CertificateSubjectOptions,
  Request,
  Response
} from '@javascript-cerficate-and-oauth/typings'

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

    console.log('code----', code)

    // const {
    //   access_token: accessToken,
    //   error,
    //   error_description: errorDescription
    // } = await fetch(
  }
}
