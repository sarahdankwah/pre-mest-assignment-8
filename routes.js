const express = require('express');
const passport = require('passport');

const router = express.Router();
const usermodels = require('./usermodel')
const checkUser = require('./middleware')


router.get('/', function(request, response){
    response.status(200).send("hello home")
})


router.post("/login",(req,res, next) => {
    // const { email, password } = request.body
    // // console.log(email);
    // let responseData = await usermodel.findOne({email})
    // if(responseData){
    //     if(password === responseData.password){
    //         // generate your token as token
    //         response.status(200).send({message:"Successful"})
    //     } else {
    //         response.status(200).send({message:"wrong username or password"})
    //     }
    // } else {

    //     response.status(400).send({message:"User does not exist"})
    // }

    // Using Passport
    passport.authenticate('local',(err, user,info) => {
        if (err) {
            return next(err);
          }
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
      
            return res.status(200).send({success: true, data: user.username});
          });
    })(req,res,next)

})

router.post('/signup', async (request,response,next) => {
    const { firstname, lastname, email,password } = request.body
    
    // if(!firstname) return next(JSON.stringify({err:"No fisrtname"}));
    // const responseData = {};
    // try {
    //     let newuser = new usermodel({firstname, lastname, email, password})
    
    //      responseData =  await newuser.save()
    // } catch (error) {
    //     response.status(400).send({message:error})
        
    // }
    
    // response.status(200).send({message:"you have successfully signed up. You can login now!!!", data: responseData})

    // Using Passport
    try {
            const newuser = new usermodel({firstname, lastname, email, password})
            await newuser.setPassword(password)
            const responseData =  await newuser.save()

            console.log({ firstname, lastname, email,password })
            response.status(200).send(responseData)

    } catch (error) {
      console.log(error)
        
    }

})

router.post("/payment", checkUser,  async (request,response) => {
    const { email, amount } = request.body
    console.log(email)

    response.status(200).send({message:"Payment made successfully"})
})

router.get("/find", async (request,response) => {
  let responseData = await usermodels.find({})

  response.status(200).send({message:"Payment made successfully",data: responseData})
})



module.exports = router