const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const SECRET_KEY = "thisismyfirstbigproject";

// ROUTE 1: create users using POST "/api/auth/createusers"   --no login required
router.post('/createuser',[             // this function takes 3 parameters [ PATH, VALIDATOR, CALLBACK FUNCTION]
    body('name','field length must be  greater than 3 characters').isLength({ min: 3 }), // body keyword is exported from express validator
    body('email','enter a valid email').isEmail(),                                       //  this snippet is used to validate 
    body('password','field length must be greater than 7 characters').isLength({min:7})//  input submitted by the user
],async (req,res)=>{

    // displays error msg when input type is incorrect
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

      // check weather the user already exits
    let user = await User.findOne({email:req.body.email})
    if(user)
    {
      return res.status(400).json({error: 'sorry the user with this email already exists'})
    }

    // using bycrypt to generate the hash of the password using the salt and the input(entered) passwords
    let salt = await bcrypt.genSalt(10)
    let securePass = bcrypt.hashSync(req.body.password,salt)
    //create users in db
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      }); // displays the information of the user in the response body
      
      // generating a JWT using jwt library 
      const data ={
        user:{
          id:user.id,
        }
      }
      const jwtToken = jwt.sign(data,SECRET_KEY);
      res.send({jwtToken});

    }
    catch(err){
      console.error(err.message)
      res.status(500).send("some error occured")
    }
    
    
})



// ROUTE 2: authenticate users using POST "/api/auth/loginusers"   --no login required
router.post('/loginuser',[                // router.post("PATH","VALIDATOR",CALLBACK) 
      body('email','Enter a valid email').isEmail(), // body keyword is exported from express validator
      body('password','field length must be greater than 7 characters').isLength({min:7})
      ], async (req, res)=>{
        const error = validationResult(req);

        // displays error if we get error from the validation result
        if(!error.isEmpty())
        {
         return res.status(400).json({errors:error.array()})
        }

        try{
          // searchs the user in the database
          let user = await User.findOne({email:req.body.email})
          // if the user is not found below snippet will be executed
          // it sends a response with 500 status and a error msg
          if(!user)
          {
            return res.status(500).send({error:'Enter a valid username'})
          }
          // the below function compares passwords the user provided with the database
          // .compare(myPlaintextPassword, hash, call back function(err, result){})
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(!result){
              return res.status(400).json(err)
            }
        });
        // generating a JWT 
        const data ={
          user:{
            id:user.id,
          }
        }
        const jwtToken = jwt.sign(data,SECRET_KEY);
        res.send({jwtToken});

        }

        catch(err){
          console.error(err.message)
           res.status(500).send("some error occured")
        }
      } )


// ROUTE 3: get loggedIN users details using POST "/api/auth/getuser"   --Login required
// SUMMARY:
// we are first checking if the JWt token in the request header is authenticate or not using a middleware
// in the middleware using JWT.verify we are authenticating as well as decoding the data( USER ID ) in the token
// return type is a json with USERID
// after we get the USERID then we search our DB for it and return the user data

// this function takes 3 parameters [ PATH, VALIDATOR, CALLBACK FUNCTION]
router.post('/getuser', fetchuser, async (req,res)=>{
  try {
    const userId = req.user.id;
    //console.log(req.user.id);
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Internal server error')
  }
})








module.exports = router