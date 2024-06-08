import {
  generateAccessToken,
  generateRefreshToken,
} from "../functions/generateToken.js";
import loginUser from "../functions/loginUser.js";

const login = async (req, res) => {
  try {
    const id = await loginUser(req.body);
    const token = generateAccessToken({ userid: id });
    const refreshtoken = generateRefreshToken({ userid: id });

    //saving token in browser cookies
    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshtoken", refreshtoken, { httpOnly: true });

    res.json({ token: token, refreshtoken: refreshtoken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default login;
