const jwt = require("jsonwebtoken");
// const generateAccessToken = require("../controllers/login");

function Auth(req, res, next) {
  console.log();
  console.log('authorization');
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      refreshToken(req.cookies.refreshtoken,req, res)
        //token refreshed succesfully
        .then(() => {
          next();
        })
        //if refresh token also expired 
        .catch(error => {
          console.log('nie działa');
          return res.status(403).json({ error: err.message });
        });
    } else {
      req.userid = decoded.userid; // seting userid in req
      next();
    }

    //req.userid = decoded.userid;
  });
}

module.exports = Auth;

//*
function refreshToken(refreshtoken,req, res) {
  return new Promise((resolve, reject) => {
    if (refreshtoken == null) return reject(new Error('No refresh token'));

    jwt.verify(refreshtoken, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err);

      const id = decoded.userid;

      // seting userid in req
      req.userid = id

      //generate token function to fix
      const newtoken = jwt.sign({ userid: id }, process.env.TOKEN_SECRET, { expiresIn: '10s' });
      
      console.log('newtoken: ', newtoken);
      res.cookie('token', newtoken);
      resolve();
    });
  });
}