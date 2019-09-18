const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');
app.set('views','./views');
// Declare static folder to be served. It contains the js, images, css, etc.
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('home.ejs');
});

app.listen(PORT,() => {
    console.log('server running....');
})