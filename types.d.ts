declare namespace Express {
  export interface Request {
    user?: string | JwtPayload;
  }
  export interface Response {
    user?: string;
  }
}
