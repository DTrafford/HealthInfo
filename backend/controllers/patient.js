const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const patient = new Patient({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      doctorName: req.body.doctorName
    });
    patient
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

exports.patientLogin = (req, res, next) => {
  let fetchedUser;
  Patient.findOne({ email: req.body.email })
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
          doctorName: fetchedUser.doctorName
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
        doctorName: fetchedUser.doctorName
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Authentication Failed"
      });
    });
};

exports.updatePatient = (req, res, next) => {
  Patient.updateOne(
    { _id: req.params.id },
    {
      healthData: req.body
    //   {
    //     heartRate: {"label": req.body.heartRate.label, "value": req.body.heartRate.value},
    //     bloodPressure: {"label": req.body.bloodPressure.label, "value": req.body.bloodPressure.value},
    //     bodyWeight: {"label": req.body.bodyWeight.label, "value": req.body.bodyWeight.value},
    // }
  }
  ).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update Successful", result: result });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Updated Failed"
      });
    });
};

exports.getPatient = (req, res, next) => {
  Patient.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'User Not Found By Server'
    })
  })
  }

exports.getPatientList = (req, res, next) => {
  const pageSize = +req.query.pagesize; // The + sign converts the strings to numbers
  const currentPage = +req.query.page;
  const patientQuery = Patient.find();
  let fetchedPatients;
  if(pageSize && currentPage) {
    patientQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  patientQuery.find().then(documents => {
    fetchedPatients = documents;
    return Patient.count();
  })
  .then(count => {
    res.status(200).json({
      message: 'Patients Fetched Succesfully',
      patients: fetchedPatients,
      totalPatients: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not retrieve patients'
    });
  });
}
