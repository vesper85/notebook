const jwt = require('jsonwebtoken')
const SECRET_KEY = "thisismyfirstbigproject";

// return type is a json with USERID
const fetchuser = (req,res, next)=>{
    const JWTtoken = req.header('auth-token');
    if(!JWTtoken)
    {
        return res.status(401).send('Please authenticate using a valid token')
    }
    try {
        const data = jwt.verify(JWTtoken,SECRET_KEY);
        //console.log(data);
        req.user = data.user;
        next()
    } catch (err) {
        console.error(err.message)
        return res.status(401).send('Please authenticate using a valid token')
    }
}

module.exports = fetchuser;