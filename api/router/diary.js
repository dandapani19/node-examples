const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const checkAuth =require('../middleware/check-auth');
const Diary = require('../../models/diary');

router.get('/',checkAuth,(req, res, next) =>{
  Diary.find()
  .then(doc =>{
    console.log('------>dec---->',doc);
    res.status(200).json({
      message: 'Handling GET request to /diary',
      data:doc
    });
  })
  .catch(err =>{ res.status(404).json(err)})
});

router.post('/',checkAuth,(req, res,next) =>{
  Diary.create({
    Diary:req.body.diary,
    Notes:req.body.notes
  })
  .then(data =>{
         console.log('---------->data------>',data);        
         res.status(200).json({
          message: 'Diary created success',
          user:data
        });
  })
  .catch(err => console.log(err));
 
});


module.exports = router;