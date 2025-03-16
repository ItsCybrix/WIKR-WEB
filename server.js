const express = require('express')

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public/assets'))

app.set('views', './public/views');


// Define routes

app.all('/', (req, res)=>{
    res.render('index')
})




app.listen(9457, ()=>{
    console.log('WIKR Web service has started on port 9457')
})