const express = require('express');
const path = require('path');
const app = express()


const hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});

app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', function(req, res) {
  res.render('home')
})

app.get('/student', function(req, res) {
  // opens this homepage
  // retrieves from database
})


app.listen('3000', function() {
  console.log('Server listening on port 3000!');
})
