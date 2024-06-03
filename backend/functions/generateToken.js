import jwt from "jsonwebtoken";

export function generateAccessToken(userid) {
    return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: "10s" });
  }

export function generateRefreshToken(userid) {
    return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: "170s" });
  }