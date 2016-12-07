var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));

var parser = require('body-parser').urlencoded({extended: false});

app.get('/', (req, res) => res.render('home2'));

app.get('/about', (req, res) => res.send('Khoa Pham training'))

app.get('/chao/:ten', (req, res) => {
  var {ten} = req.params;
  res.send(`Chao ban ${ten}`);
});

app.post('/hello', parser, (req, res) => {
  var {ten, tuoi} = req.body;
  res.send(`Chao ban ${ten}: ${tuoi} tuoi`);
});
