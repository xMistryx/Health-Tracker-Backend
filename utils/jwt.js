import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
