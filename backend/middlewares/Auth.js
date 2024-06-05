import jwt from "jsonwebtoken"
import refreshToken from "../functions/refreshToken.js";


function Auth(req, res, next) {
  console.log();
  //console.log('authorization');
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    //console.log(err);
    if (err) {
      //check token
      //****** check is he in db if yes error :)
      if(token !== req.cookies.token || err.toString().substr(0, 12) !== "TokenExpired") return res.status(403).json({ error: "error" });

      refreshToken(req.cookies.refreshtoken,token,req, res)
        //token refreshed succesfully
        .then(() => {
          next();
        })
        //if refresh token also expired 
        .catch(error => {
          return res.status(403).json({ error: err.message });
        });
    } else {
      // seting userid in req
      req.userid = decoded.userid; 
      next();
    }

    //req.userid = decoded.userid;
  });
}

export default Auth

