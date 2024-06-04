import jwt from "jsonwebtoken"
import {generateAccessToken} from "./generateToken.js";

export default function refreshToken(refreshtoken,req, res) {
    return new Promise((resolve, reject) => {
      
      if (refreshtoken == null) return reject(new Error('No refresh token'));
  
      //checking refreshtoken is active
      jwt.verify(refreshtoken, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return reject(err);
  
        const id = decoded.userid;
  
        // seting userid in req
        req.userid = id
  
        //generate token function to fix
        const newtoken = generateAccessToken({ userid: id })
        
        console.log('newtoken: ', newtoken);
        res.cookie('token', newtoken, {httpOnly: true});
        resolve();
      });
    });
  }