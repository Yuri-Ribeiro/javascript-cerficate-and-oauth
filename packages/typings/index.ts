import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express'

export interface Request<T = any> extends ExpressRequest {
  body: T
  token: string
}

export type Response<T = any> = ExpressResponse<T>

export type NextFunction = ExpressNextFunction
