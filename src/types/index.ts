export * from './global';
export * from './sidebar.type';
export * from './academicManagement.type';
export * from './userManagement.type';
export * from './courseManagement.type';

export type TUser = {
    userId: string
    role: string
    iat: number
    exp: number
  }
  
  export type TQueryParam = {
    name: string
    value: boolean | React.Key
  }
