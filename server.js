const { default: axios } = require('axios');
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())



app.set('view engine', 'ejs');
app.use(express.static('./public/assets'))

app.set('views', './public/views');






// Define routes

app.all('/', (req, res)=>{
    res.render('index')
})

app.get('/listen-live', (req, res)=>{
    res.render('liveplayer');
})


app.get('/api/now-playing',(req, res)=>{
    axios.get('http://ice1.wikrradio.com/status-json.xsl')
      .then(function (response) {
        //console.log(response.data.icestats.source.title);
        res.send(response.data.icestats.source.title)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
})

app.post('/api/nowplaying', (req, res)=>{
  console.log(req.body)
  console.log('NP POST');
  res.status(200)
})


app.get('/api/now-playing-image',(req, res)=>{
  axios.get('http://ice1.wikrradio.com/status-json.xsl')
    .then(function (response1) {
      //console.log(response.data.icestats.source.title);

      axios.get('https://assets.wikrradio.com/' + response1.data.icestats.source.title + ".jpg")
      .then(function (response) {
        //console.log(response.data.icestats.source.title);
        res.send('https://assets.wikrradio.com/' + response1.data.icestats.source.title + ".jpg")
  
        
  
  
        
      })
      .catch(function (error) {
        if(error.status == 404){
          res.send('/img/WIKR Logo.png')
        }
      })
      .finally(function () {
        // always executed
      });


      
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
})






app.listen(9457, ()=>{
    console.log('WIKR Web service has started on port 9457')
})