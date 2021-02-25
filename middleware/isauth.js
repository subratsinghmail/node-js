const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    console.log('lol')
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    console.log('lol1')
    return next();
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
  } catch (err) {
    req.isAuth = false;
     console.log(err)
    return next();
    
  }

  if (!decoded) {
    req.isAuth = false;
    console.log('lol3')
    return next();
  }


  if(decoded.name){
      req.isAuth=true;
      req.name=decoded.name;
      next();
  }
 



  
};
