const express = require('express');
const path = require('path');
const app = express()

// mongoDB
var mongoose = require('mongoose');
var Question = require('./models.js').Question


mongoose.connect("mongodb://browngineerz:cocomo12@ds261332.mlab.com:61332/questionable", function(err) {
  if(err) console.log('There was an error', err);
  else console.log('Connected :)');
});

// HBS setup
const hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});

app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  const tickets = 'Questionable'
  res.render('homePage', {tickets: tickets})
})

app.get('/student-login', function(req, res) {
  res.render('loginPage')
})

app.get('/teacher-login', function(req, res) {
    res.render('teacherLogin')
})

app.get('/student-questions', function(req, res) {
    // query mongodb for questions
    Question.find({}, function(error, questions) {
        questionArray = questions.map(function(questionObject) {
            return questionObject.question
        })
    res.render('studentQuestions', {questions: questionArray})
    })

})

app.post('/submit-question', function(req, res) {
    // here would be logic to submit questions to mongoDB
})

app.post('/answer-question', function(req, res) {

})


app.listen('3000', function() {
  console.log('Server listening on port 3000!');
})
