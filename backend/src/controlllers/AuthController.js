const User = require("../models/user.models");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checked if mail exists
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }
    //if email exists, check password;
    const pass = await User.findOne({ password: req.body.password });

    if (!pass) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }
    // if it matches
    return res.status(200).send({user,status:true})
  } catch (err) {
    res.status(400).send({ status: false });
  }
};

module.exports = { login };
