const jwt = require('jsonwebtoken');

const login = (req,res) =>{

    const id = authUser(req.body)
    const token = generateAccessToken({ userid: id });

    res.json(token);

}

module.exports = login

function generateAccessToken(userid) {
    return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: '60s' });
  }

function authUser(userdata) {

    //checking user in db
    //console.log(userdata)

    return "2hf972bbwq"
    //return userid
}