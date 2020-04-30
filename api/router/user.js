const express = require('express');
const router = express.Router();

const db = require('../../config/database');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

router.post('/signup',(req, res, next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            res.status(500).json({message:"Email already exist"});
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    res.status(500).json({error: err});
                }
                else{
                    const token = jwt.sign({
                        email:req.body.email,
                    },
                    'secret',
                    {
                       expiresIn:"1h"
                    }
                    );
                    User.create({
                        firsName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:hash,
                        auth_token:token
                   })
                   .then(result =>{
                       res.status(201).json({message:'User Created',data:result})
                   })
                   .catch(err =>{error:err});
                }
            });
        }
    })
    .catch(err=>{error:err});
  

})



router.post('/login',(req,res, next)=>{
    User.find({email:req.body.email})
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({message:"Fail to check login"});
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
         if(err){
             return res.status(401).json({message:"Auth Failed",error:err})
         }
         if(result){
             const token = jwt.sign({
                 email:user[0].email,
                 id:user[0].id
             },
             'secret',
             {
                expiresIn:"1h"
             }
             );
             console.log(user[0]._id,'---------user id',token)

             User.updateOne({ $set: {auth_token:token} })
             .then(succes=>{
                 if(succes){
                    return res.status(201).json({
                        message:'Login Successfully',
                        user:succes,
                        token: token
                    })
                 }else{
                    res.status(500).json({
                        message:'Login faild',
                    })
                 }
                 
             })
             .catch(err =>{error:err})
            
         }
         res.status(500).json({
            message:'Login faild',
        })
        })

    })
    .catch(err=>{ 
        return res.status(401).json({message:"Fail to login",error:err})
    })
})


router.get('/',(req, res) =>{
    User.find()
    .then(doc =>{
      console.log('------>dec---->',doc);
      res.status(200).json({
        message: 'Handling GET request to user',
        data:doc
      });
    })
    .catch(err =>{ res.status(404).json(err)})
     
  });
module.exports = router;