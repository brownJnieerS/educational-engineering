var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  question: String,
  answer: String
})


Question = mongoose.model('question', questionSchema)


module.exports = {
    Question: Question
};
