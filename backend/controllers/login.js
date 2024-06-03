import jwt from "jsonwebtoken";

const login = (req, res) => {
  const id = authUser(req.body);
  const token = generateAccessToken({ userid: id });

  //*
  const refreshtoken = generateRefreshToken({ userid: id });

  //saving token in browser cookies
  res.cookie("token", token);

  //*
  res.cookie("refreshtoken", refreshtoken);

  res.json({ token: token, refreshtoken: refreshtoken });
};

export default login;


function generateAccessToken(userid) {
  return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: "10s" });
}

//*
//exports.generateAccessToken = generateAccessToken

//*
function generateRefreshToken(userid) {
  return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: "70s" });
}

function authUser(userdata) {
  //checking user in db
  //console.log(userdata)

  return "2hf972bbwq";
  //return userid
}
