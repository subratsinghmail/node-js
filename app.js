const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();
//setting up the express app
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);


const shopRoutes = require('./routes/shop');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// 

app.use(errorController.get404);



mongoConnect((client) => {
  
  app.listen(3000);
 
});
