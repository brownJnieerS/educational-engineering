const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const firebase = require('firebase')
const app = express()



// mongoDB
var mongoose = require('mongoose');
var Question = require('./models.js').Question

var config = {
  apiKey: "AIzaSyAn_1ljl18uTo-2fuOLeT5aMXNmAwGU47U",
  authDomain: "software-engineering-project-1.firebaseapp.com",
  databaseURL: "https://software-engineering-project-1.firebaseio.com",
  projectId: "software-engineering-project-1",
  storageBucket: "software-engineering-project-1.appspot.com",
  messagingSenderId: "495472687615"
}

firebase.initializeApp(config);



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

app.use(fileUpload());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('homePage')
})

app.get('/student-questions', function(req, res) {
    // query mongodb for questions
    Question.find({}, function(error, questions) {
        res.render('studentQuestions', {questions: questions})
    })
})

app.post('/auth', function(req, res) {
    const auth = firebase.auth()
    const user = req.body.user
    const password = req.body.password
    // Sign in
    const promise = auth.signInWithEmailAndPassword(user, password)
    promise.catch(e => res.redirect('/teacher-login'))

    auth.onAuthStateChanged(user => {
        if(user) {
            res.redirect('/teacher-questions'); //After successful login, user will be redirected to teacher view
        }
      });
})

app.post('/signupaccount', function(req, res) {
    console.log()
    const auth = firebase.auth()
    const email = req.body.email
    const password = req.body.password

    // Sign up
    const promise = auth.createUserWithEmailAndPassword(email, password)
    promise.catch(e => res.render('signUpPage'))
})


app.get('/teacher-login', function(req, res) {
    res.render('loginPage')
})

app.get('/teacher-signup', function(req, res) {
    res.render('signUpPage')
})

app.get('/teacher-questions', function(req, res) {

    const auth = firebase.auth()
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // query mongodb for questions
            Question.find({}, function(error, questions) {
                res.render('teacherQuestions', {questions: questions})
            })
        } else {
          // User is signed out and must sign in again
          res.redirect('/teacher-login')
        }
      })
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
    const question = req.body.question
    const newQuestion = new Question({question: question, answer: ''})
    newQuestion.save()
})

app.post('/answer-question/:id', function(req, res) {
    const id = req.params.id
    const answer = req.body.answer
    Question.findById(id, function(err, question) {
        question.answer = answer
        question.save()
    })
})

app.post('/upload', function(req, res) {
    console.log(req.files.fileData);
})


app.listen('3000', function() {
  console.log('Server listening on port 3000!');
})
