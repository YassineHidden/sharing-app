var PORT=process.env.PORT || 3000;
var express= require('express');
var app=express();
var path=require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
//res.send('<a href="/auth/facebook">Login with Facebook</a>');
res.sendFile(path.join(_dirname, 'public', 'index.html'));
});


app.listen(PORT);
//app.get('')