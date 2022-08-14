
var express = require('express');
var router = express.Router();

// upload files
var multer = require('multer');
var Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb)=>{
      cb(null, file.originalname);
    }
});
const upload = multer({ storage: Storage }).single('documentation');

// comments and file upload schema
const commDocModel = require('../models/CommDoc');

// client side
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
    upload(req, res, (err)=>{
      if(err){
        console.log(err)
      } else {
        const newDocumentation = new commDocModel({
          account: req.body.accountNumber,
          comments: req.body.comments,
          documentation: {
              data: req.file.filename,
              contentType: 'documentation/jpeg'
          }
        })
        newDocumentation.save().catch(err=>console.log(err));
      }
    })

});

module.exports = router;
