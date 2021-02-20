const path = require('path');

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

//controller which turns the function.
const errorController = require('./controllers/error');
const authRoutes=require('./routes/auth');
//const mongoConnect = require('./util/database').mongoConnect;


//setting an instantiating the app.
const app = express();
//setting up the express app
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const adminRoutes = require('./routes/admin');
const tripRoutes=require('./routes/trips');
app.use('/trips',tripRoutes)
app.use('/admin', adminRoutes);
app.use('/auth',authRoutes);


//const shopRoutes = require('./routes/shop');



app.use(express.static(path.join(__dirname, 'public')));
// 

app.use(errorController.get404);

mongoose.connect('mongodb+srv://test:test@cluster101.jqj99.mongodb.net/sample_training?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',()=>
{  console.log('connected') 
 app.listen(3000) })
 
 .on('error',()=>{console.log('err')})
  // console.log('connected')
  // app.listen(3000)


// mongoConnect((client) => {
  
//   app.listen(3000);
 
// });
