const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const validator = require("../validator/validator");

const createColleges = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let collegeData = req.body;

    // BODY VALIDATION
    if (!validator.isValidRequestBody(collegeData)) {
      return res
        .status(400)
        .send({ status: false, msg: "college details required" });
    }

    // NAME VALIDATION
    if (!validator.isValidField(collegeData.name)) {
      return res.status(400).send({ status: false, msg: "Name is required" });
    }
    if (!validator.isValidName(collegeData.name)) {
      return res.status(400).send({ status: false, msg: "Name is not valid" });
    }
    let collegeName = await collegeModel.findOne({ name: collegeData.name });
    if (collegeName) {
      return res
        .status(400)
        .send({ status: false, msg: "This name already exists" });
    }

    // FULL NAME VALIDATION
    if (!validator.isValidField(collegeData.fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Full Name is required" });
    }
    if (!validator.isValidName(collegeData.fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Full Name is not valid" });
    }

    // LOGO LINK VALIDATION
    if (!validator.isValidField(collegeData.logoLink)) {
      return res
        .status(400)
        .send({ status: false, msg: "Logo link is required" });
    }
    if (!validator.isValidURL(collegeData.logoLink)) {
      return res
        .status(400)
        .send({ status: false, msg: "Logo Link is Invalid" });
    }

    // CREATE COLLEGE DATA
    let newCollege = await collegeModel.create(collegeData)
    newCollege = JSON.parse(JSON.stringify(newCollege));
    
    ["_id", "createdAt", "updatedAt", "__v"].forEach(e => { delete newCollege[e]});
   
    return res.status(201).send({ status: true, data: newCollege });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};




// ********************************************************************** \\




// GET LIST OF INTERNS BY COLLEGE
const getCollegeDetails = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let collegeName = req.query.collegeName;
    if (!validator.isValidField(collegeName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid college name" });
    }

    let college = await collegeModel
      .findOne({ name: collegeName, isDeleted: false })
      .select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });

    if (college == null) {
      return res.status(404).send({ status: false, msg: "college not found" });
    }

    const interns = await internModel
      .find({ collegeId: college._id, isDeleted: false })
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });
    if (interns.length == 0) {
      return res.status(404).send({ status: false, msg: "no interns found" });
    }

    college = JSON.parse(JSON.stringify(college));
    delete college._id;
    college.interns = interns;
    res.status(200).send({ status: true, data: college });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createColleges, getCollegeDetails };

//......................
