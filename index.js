const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//view engine
app.set('view engine','ejs');
app.set('views','./views');

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log('error in running',err);
    }
    console.log('server is running on :',port);
});