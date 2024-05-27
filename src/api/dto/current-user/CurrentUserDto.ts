export interface ICurrentUserDto<U> {
  user?: U;
  jwt?: string;
  jwtRefresh?: string;
}

export interface IAuthUserDto<U> {
  isConnected?: boolean;
  user: ICurrentUserDto<U> | null;
}
