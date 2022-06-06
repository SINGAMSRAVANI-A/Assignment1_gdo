const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Users = require("../models").users;
const UsersDao = require("../dao/user");
const { body, validationResult } = require("express-validator");

const validate=[
    body('name').isAlpha().withMessage('Name should contain only Alphabets')
    .notEmpty().withMessage(`Name can't be empty`),
    body('age').isNumeric().withMessage('Age should be in numbers'),
    body('email').isEmail().withMessage('Enter valid email id'),
    body('password').isLength({min:7})
    .withMessage('Password length should be atleast 7')
    .matches(/[a-z]/)
    .withMessage('Must contain  atleast one lower casecharacter')
    .matches(/[A-Z]/)
    .withMessage('Must contain atleast one upper case character')
    .matches(/\d/)
    .withMessage('Must contain atleast 1 number')
    .matches(/[@$!%*?&]/)
    .withMessage('Must contain atleast one special character')
    .notEmpty().withMessage(`Password can't be empty`),
    body('mobile').isNumeric().withMessage('Mobile Number contain only digits')
    .isLength({min:10,max:10}).withMessage('Mobile Number should contain exactly 10 digits'), 
    body('role')
    .notEmpty().withMessage(`Role can't be empty`),
    body('gdo')
    .notEmpty().withMessage(`Gdo can't be empty`),
    
  ]
  
router.post("/", jsonParser,validate, async (req, res) => {
    console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    else{      
    try {
      let register=true;
      if(!(req.body.role==='Employee')){
        const role=req.body.role;
        const gdo=req.body.gdo;
        console.log(role,gdo)
      const user = await Users.findOne({ where: { role,gdo } });
      console.log(JSON.stringify(user));
      if(user){
        register=false;
      res.json({
        message:"Already Admin is there"
      })
    }    
     }      
      if(register){
      const newUser = await UsersDao.createUser(req.body);
      res.json({
        message: `Created a new User with User_id ${newUser.id}`,
      });
    } }
    catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  }
  
  });

module.exports = router;
