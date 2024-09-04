const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser'); // need to download this as well if we use older method  

const app =express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // older method of  app.use(express.json())

app.get('/',(req,res)=>{
    res.send(`
      <h2> Welcome To The Studen Table </h2>
      <h3> Click Here <b> <a href ='/student/list'>Database<a/></h3>  `)
})

app.set('views',path.join(__dirname,'/views'))

app.engine('hbs',exphbs({
  handlebars:allowInsecurePrototypeAccess,
  extname: 'hbs',
  defaultLayout :'MainLayout',
  layoutsDir:__dirname + '/views/layouts'
}))

app.set('view engine', 'hbs');

app.listen(3000,()=>{
    console.log('server is started');
    
})