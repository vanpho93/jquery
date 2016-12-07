var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));
var {getGirl, likeGirl} = require('./db.js');
var parser = require('body-parser').urlencoded({extended: false});

app.get('/', (req, res) => {
  getGirl(1, girl => {
    res.render('home3', {girl});
  });
});

app.get('/api/info/:id', (req, res) => {
  var {id} = req.params;
  getGirl(id, girl => {
    if(girl == undefined){
      return res.send('')
    }
    var r = `<h1>${girl.name}</h1>
    <div id="app">
      <a href="#" id="a-truoc">Truoc</a>
      <a href="#" id="a-sau" class="a-right">Sau</a>
      <input type="hidden" id="girl-id" value="${girl.id}">
      <hr>
      <img src="images/${girl.image}" width="150px">
      <hr>
      <a href="#">${girl.nlike} Like</a>
      <a href="#" class="a-right">${girl.ndislike} Dislike</a>
    </div>`;
    res.send(r);
  })
})
//
// app.get('/about', (req, res) => res.send('Khoa Pham training'))
//
// app.get('/chao/:ten', (req, res) => {
//   var {ten} = req.params;
//   res.send(`Chao ban ${ten}`);
// });
//
// app.post('/hello', parser, (req, res) => {
//   var {ten, tuoi} = req.body;
//   res.send(`Chao ban ${ten}: ${tuoi} tuoi`);
// });
