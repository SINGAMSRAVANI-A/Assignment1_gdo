const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const Users = require("../models").users

router.post("/", jsonParser, async (req, res) => {
        const password = req.body.password;      
        const email= req.body.username;              
        const userDetails = await Users.findOne({ where: { email,password} });
        console.log(userDetails)
          console.log("=================")          
       if (!userDetails) {
                res.status(400).json({ error: 'user credentials wrong' });
        }    
        else {
            const payload = {};
            console.log(`match.rows: ${JSON.stringify(userDetails)}`);
            const role = userDetails.role;
            console.log(`role: ${role}`);
        
            if (role == "Employee") {
              payload.isEmployee=true;
              payload.isAdmin=false;
              payload.isSuperAdmin=false;
            } else if (role == "Admin") {
              payload.isEmployee = false;
              payload.isAdmin = true;
              payload.isSuperAdmin = true;
            } else if (role == "Super Admin") {
              payload.isEmployee = false;
              payload.isAdmin = false;
              payload.isSuperAdmin = true;
            }
            console.log(`payload: ${JSON.stringify(payload)}`);
            const token = jwt.sign(payload, "secret123");
            res.json({ jwt: token });
          }
        
        
            
  });

module.exports = router;
