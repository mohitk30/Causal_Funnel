const express = require("express")
const router = express.Router() 
const UserModel=require('../../models/user')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt= require('jsonwebtoken');

// Auth Routes

// register route 

router.post('/register', async (req, res) => { 
     
    try{
        const userRegisterData=req.body;
        const checkEmailExist=await UserModel.findOne({email:userRegisterData.email});
        if(checkEmailExist==null){
            var hashPassword = bcrypt.hashSync(userRegisterData.password, salt);
          const result= await UserModel.create({
            email:userRegisterData.email,
            password:hashPassword
          });
          res.send( {status:'200',message:'Registered Successfully.'} );
        }else{
            res.send( {status:'404',message:'User already exist.'});
        }
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with user data.'});

   }
})


// login route

router.post('/login', async (req, res) => { 
     
    try{
        const userLoginEmail=req.body.email;
        const userLoginPassword=req.body.password;
        const result= await UserModel.findOne({email:userLoginEmail});
        if(bcrypt.compareSync(userLoginPassword, result.password)){

            // create and assign a token 
            const token=jwt.sign(
                {email:userLoginEmail,id:result._id},
                process.env.MY_SECRET, 
                { expiresIn: '1h' }
                )

            res.header('auth-token',token).send(token);
        }else{
            res.send( {status:'401',message:'Unauthorized'} );
        }

       
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with user data.'});

   }
})



// reset password route


router.post('/reset', async (req, res) => { 
     
    try{
        const userLoginEmail=req.body.email;
        const userLoginPassword=req.body.password;
        const checkEmailExist=await UserModel.findOne({email:userLoginEmail});
        if(checkEmailExist!=null){
            var hashPassword = bcrypt.hashSync(userLoginPassword, salt);
            const result= await UserModel.findOneAndUpdate(
                {email:userLoginEmail},
                {password:hashPassword}
                );
          res.send( {status:'200',message:'Password Reset Successfully. You can Login again'} );
        }else{
            res.send( {status:'404',message:'User already exist.'});
        }

        
         
       
        

       
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with user data.'});

   }
})



module.exports = router