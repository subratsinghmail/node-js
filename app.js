const path = require('path');

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
<<<<<<< HEAD
const session=require('express-session');
const adminRoutes = require('./routes/admin');
const tripRoutes=require('./routes/trips');
=======
//instantiating morgan for the logging purposes.
const morgan=require('morgan');
>>>>>>> reset
//controller which turns the function.
const errorController = require('./controllers/error');
const authRoutes=require('./routes/auth');
//const mongoConnect = require('./util/database').mongoConnect;

const authRouter=require('./routes/auth');
//importing the auth Router.


const  MongoDBStore  = require('connect-mongodb-session')(session);


<<<<<<< HEAD
const URI='mongodb+srv://test:test@cluster101.jqj99.mongodb.net/sample_training'
//setting an instantiating the app.
const app = express();
const store=new MongoDBStore({
   uri: URI,
   collections:'sessions'
})
//setting up the express app
=======
//setting an instantiating the setting the app.
const app = express();
app.use(morgan("tiny"));
//settting the templating engine.
>>>>>>> reset
app.set('view engine', 'ejs');
app.set('views', 'views');
//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
<<<<<<< HEAD
=======
const adminRoutes = require('./routes/admin');
const tripRoutes=require('./routes/trips');
app.use('/trips',tripRoutes)
app.use('/admin', adminRoutes);
app.use('/auth',authRoutes);
>>>>>>> reset

//using the session functionality from express.
app.use(session({secret:'dont',resave:false,saveUninitialized:false,store:store}))
//configuring the routes.
app.use('/auth',authRouter)
//app.post('/signup',authService.signup);
// app.post('/login',authService.getLogin)
app.use('/trips',tripRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);

//const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));
// 


// using mongoose to connect to the database.
mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',()=>
{  
 app.listen(3000) 

 console.log('connected') 

})
 
 .on('error',()=>{console.log('err')})
  // console.log('connected')
  // app.listen(3000)


// mongoConnect((client) => {
  
//   app.listen(3000);
 
// });
