const { default: axios } = require('axios');
const express = require('express')

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
        console.log(response.data.icestats.source.title);
        res.send(response.data.icestats.source.title)
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