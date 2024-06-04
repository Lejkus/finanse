import {generateAccessToken,generateRefreshToken} from "../functions/generateToken.js";
import loginUser from "../functions/loginUser.js"

const login = (req, res) => {
  const id = loginUser(req.body);
  const token = generateAccessToken({ userid: id });

  //*
  const refreshtoken = generateRefreshToken({ userid: id });

  //saving token in browser cookies
  res.cookie("token", token,{httpOnly: true});

  //*
  res.cookie("refreshtoken", refreshtoken,{httpOnly: true});

  res.json({ token: token, refreshtoken: refreshtoken });
};

export default login;

