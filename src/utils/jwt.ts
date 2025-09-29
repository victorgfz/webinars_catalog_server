import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';
const JWT_EXPIRES_IN = '1d';

export function signIn(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}