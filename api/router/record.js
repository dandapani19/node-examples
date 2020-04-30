const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const multer = require('multer');
const checkAuth =require('../middleware/check-auth');

const storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads');
  },
  filename: function(req,file, cb){
    cb(null, new Date().toISOString()+file.originalname);
  }
});
 
const upload = multer({storage: storage});

const Record = require('../../models/order');
// Get user information
router.get('/',(req, res) =>{
  console.log('----------get record')
  Record.findAll()
  .then(doc =>{
    console.log('------>dec---->',doc);
    res.status(200).json({
      message: 'Handling GET request to /user',
    });
  })
  .catch(err =>{ res.status(404).json(err)})
   
});
// Add user information
router.post('/',checkAuth,upload.single('productImage'), (req, res, next) =>{
console.log(req.body);

    Record.create({
      Name:req.body.Name,
      salary:req.body.salary
    });
    record
    .then(data =>{
           console.log('---------->data------>',data);
           res.status(200).json({
            message: 'Record created success',
            user:user
          });      
    })
    .catch(err => console.log(err));
    
});

//Get perticular user information
router.get('/:recordid',checkAuth,(req, res ,next) =>{
    const id= req.params.userid;
    Record.findById(id)
    .then( doc =>{
         console.log('-------->get user data---->',doc);
         if(doc) res.status(200).json(doc);
         else res.status(404).json({message: 'No valid data entry founod'});
         
    }) 
    .catch(err =>{
      console.log('------error---->',err);
    })
});

// Update user inforamtion
router.patch('/:recordid',checkAuth,(req, res ,next) =>{
  const id= req.params.userid;
 
Record.update({id :id },{ $set: {Name: req.body.Name , salary:req.body.salary} })
.then(data =>{
res.status(200).json(data)
})
.catch(err =>{
  res.status(404).json(err)
})
});


// Delete user information
router.delete('/:recordid',checkAuth,(req, res) =>{
  const id= req.params.userid;
 
  Record.destroy({id :id })
  .then(data =>{
  res.status(200).json(data)
  })
  .catch(err =>{
    res.status(404).json(err)
  })
});

module.exports = router;