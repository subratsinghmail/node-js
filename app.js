const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//controller which turns the function.
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;


//setting an instantiating the app.
const app = express();
//setting up the express app
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);


//const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
// 

app.use(errorController.get404);

// mongoose.connect('mongodb+srv://test:test@cluster101.jqj99.mongodb.net/sample_training?retryWrites=true&w=majority').then((result)=>{
//   console.log('connected')
//   app.listen(3000)
// })

mongoConnect((client) => {
  
  app.listen(3000);
 
});
