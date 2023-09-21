const express = require('express');
const {engine} = require('express-handlebars') 
const app = express();

const PORT = 5000;


app.engine('hbs', engine({
    extname:'.hbs',
    layoutsDir:'views/layouts', 
    defaultLayout:'main',
    partialsDir:__dirname+'/views/partials/'
}))

// app.set('view engine', 'ejs')
// app.set('views', 'templates');
app.set('view engine', 'hbs');

const products = [
    {id: '1', title:'TV', price:450.99, description: 'Best Tv'}, 
    {id: '2', title:'Radio', price:60.59, description: 'Listen to your favorite music'}, 
    {id: '3', title:'Iphone', price:1199.99, description: 'New Iphone'}, 
]

app.get('/', (req, res)=>{
    res.render('products', {products,  docTitle:'Products'})
})



app.listen(PORT, console.log(`Server connected to port: ${PORT}`))