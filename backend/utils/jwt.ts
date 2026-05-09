import jwt from 'jsonwebtoken'

export const signToken = (payload: Record<string, unknown>): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not defined')
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}

export const verifyToken = (token: string): jwt.JwtPayload => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not defined')
  return jwt.verify(token, secret) as jwt.JwtPayload
}
