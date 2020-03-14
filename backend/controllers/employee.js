const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const employee = new Employee({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      designation: req.body.designation
    });
    employee
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        console.log("ERR.DISPLAYNAME = " + err.errors.displayName);
        if (err.errors.displayName) {
          res.status(500).json({
            message: "Display Name Already Taken"
          });
        }
        if (err.errors.email) {
          res.status(500).json({
            message: "Email Already Registered"
          });
        }
        res.status(500).json({
          message: "An unknown error occured"
        });
      });
  });
};

exports.employeeLogin = (req, res, next) => {
  let fetchedUser;
  Employee.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "User not found"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Username and password do not match"
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          firstName: fetchedUser.firstName,
          lastName: fetchedUser.lastName,
          designation: fetchedUser.designation
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        designation: fetchedUser.designation
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Authentication Failed"
      });
    });
};
