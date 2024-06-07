import jwt from "jsonwebtoken";
import refreshToken from "../functions/refreshToken.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Auth(req, res, next) {
  console.log();

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    //succesfully verified token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userid = decoded.userid;
    return next();
  } catch (error) {
    //token unverified (null or object)
    const isAlreadyUsed = await prisma.jwtTokens.findFirst({
      where: {
        token: token,
      },
    });

    //token unable to refresh
    if (token !== req.cookies.token ||error.toString().substr(0, 12) !== "TokenExpired" || !isAlreadyUsed) {
      return res.status(403).json({ error: "token refresh error" });
    }

    //trying refresh token
    try {
      await refreshToken(req.cookies.refreshtoken, token, req, res);
      return next();
    } catch (refreshError) {
      return res.status(403).json({ error: refreshError.message });
    }
  }
}

export default Auth;
