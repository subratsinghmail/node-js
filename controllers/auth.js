const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res, next) => {
  //setting a cookie
  let status = await User.findOne({ name: req.body.name });
  console.log(status);
};


exports.getLogin = (req, res, next) => {
  let name1 = req.body.name;
  let password = req.body.password;
  User.findOne({ name: name1 })
    .then(async (response) => {
      //console.log(response)
      if (response) {
        const match = await bcrypt.compare(password, response.password);

        if (match) {
          const token = jwt.sign({ name: response.name }, "thisismysecret", {
            expiresIn: "1h",
          });
          res.status(200).json({
            status: 1,
            mesage: "logged in successfuly",
            data: match,
            response: response,
            token: token,
          });
        } else {
          res.status(200).json({
            status: 0,
            mesage: "your password is wrong",
            data: match,
          });
        }
      } else {
        res.status(200).json({
          status: 0,
          mesage: "no user found ",
        });
      }
      //   if(match){
      //       res.status(200).send('login successfull')
      //   }else{
      //       const err=new Error()
      //       err.status=503;
      //       err.message="Password is incorrect"
      //       res.status(err.status).send({message:err})

      //   }
    })

    .catch((err) => {
      console.log(err);
      res.status(200).json({ mesage: err });
    });
};


exports.signup = async (req, res, next) => {
  let name = req.body.name;
  let gender = req.body.gender;
  let password = req.body.password;

  //finding a user with an id.
  let check = await User.find({ name: name });

  if (!check) {
    let hash = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: req.body.name,
      gender: gender,
      password: hash,
      trips: "572bb8222b288919b68abf66",
    });

    newUser.save().then((result) => {
      res
        .status(200)
        .json({ message: "New User created successfully", data: result });
    });
    // res.status(200).json({check})
  } else {
    res.status(400).send({ message: "User already has an account" });
  }
  //creating logic.
};



exports.resetPass = (req, res, next) => {
  let name = req.query.name;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(500).send("we ran into an error");
    }

    User.findOne({ name })
      .then((result) => {
        if (!result) {
          res.status(200).send("you arent connected with us.");
        } else {
          const token = buffer.toString("hex");
          result.resetToken = token;
          result.resetTokenExpires = Date.now() + 3600000;
          return User.updateOne({ name: name }, {});
        }
      })
      .catch();
    console.log("");
  });
};


exports.login = (req, res, next) => {
  let name = req.body.name;
  User.findOne({ name: name })
    .select("-password")
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      const error = new Error("there seems to be problem");
      error.status = 503;
      throw error;
    });
};
