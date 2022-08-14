
// Mongoose schema necessary for formating data to be sent to MongoDB
// three variable has been set by default one for the account, another for the comments and one for uplading files

const mongoose = require('mongoose');

const CommDocSchema = mongoose.Schema({
  account: String,
  comments: String,
  documentation:
  {
    data: Buffer,
    contentType: String
  }
});

module.exports = CommDoc = mongoose.model('commDoc', CommDocSchema)
