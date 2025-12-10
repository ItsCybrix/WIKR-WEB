const { default: axios } = require('axios');
const express = require('express')
const fs = require('fs')

const app = express();

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
        res.send("Great Radio ON WIKR")
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
})

app.post('/api/nowplaying', (req, res)=>{
  console.log('NP POST REQUEST')
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