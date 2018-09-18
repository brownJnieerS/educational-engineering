const express = require('express');
const path = require('path');
const app = express()

// mongoDB
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect, function(err) {
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
  res.render('studentLogin')
  // retrieves from database
})

app.get('/teacher-login', function(req, res) {
    res.render('teacherLogin')
})


app.listen('3000', function() {
  console.log('Server listening on port 3000!');
})
