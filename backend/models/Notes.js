const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({

   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'

   },
 title:{
    type: String,
    required: true
 },
 author:{
    type: String,
 },
 description:{
    type: String,
 },
 tag:{
    type: String,
 },
 date:{
    type: Date,
    default:Date.now
 },
  });
  const Notes = mongoose.model('notes', notesSchema);
//   Notes.createIndexes();
  module.exports = Notes;