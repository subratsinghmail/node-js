


exports.postLogin=(req,res,next)=>{
    //setting a cookie
    req.session.islogged=true;
    res.send('hey there')

}

exports.getLogin=(req,res,next)=>{
    let name=req.body.email;
    let email=req.body.password;
    let session=req.session

}
