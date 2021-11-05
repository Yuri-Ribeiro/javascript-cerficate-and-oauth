export interface RegisterToCRLRequest {
  serialNumber: string
}

export type RegisterToCRLResponse = string | string[]

export type GetCRLResponse = string[]
