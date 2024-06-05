import jwt from "jsonwebtoken";
import { generateAccessToken } from "./generateToken.js";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default function refreshToken(refreshtoken,oldtoken, req, res) {
  return new Promise((resolve, reject) => {
    if (refreshtoken == null) return reject(new Error("No refresh token"));

    //checking refreshtoken is active
    jwt.verify(refreshtoken, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return reject(err);

      const id = decoded.userid;

      // seting userid in req
      req.userid = id;

      const newtoken = generateAccessToken({ userid: id });

      try {
        await prisma.jwtTokens.create({
          data: {
            token: oldtoken,
            createdDate: new Date(),
          },
        });
        res.cookie("token", newtoken, { httpOnly: true });
        console.log("newtoken: ", newtoken);
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  });
}
