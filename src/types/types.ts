export interface TokenInterface {
  id: string
  iat: number
  exp: number
}

export enum ManageAction {
  INVITE = 'INVITE',
  'REVOKE' = 'REVOKE'
}
