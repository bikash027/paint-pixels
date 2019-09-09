const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path=require('path');
// const routes=require('./routes');
// const session=require('express-session');
// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let ar=[];
for(let i=0;i<10;i++){
	ar.push({
				square:0,
				color:'rgb(255,255,255)'
				// time:Date.now()
			});
}
//route
app.get('/api',function(req,res){
	res.status(200).json({ar});
});
app.post('/api',function(req,res){
	// let date= new Date();
	ar.push({
			  square:req.body.square,
			  color:req.body.color
			  // time:Date.now()
			}
		   );
	ar.shift();
	// console.log(ar);
	res.status(201).json({message:'posted'});
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}
// app.get('*',function(req,res){
// 	res.send('<h1>backend</h1>');
// });
const port = parseInt(process.env.PORT, 10) || 5000;
app.listen(port, () => {
    console.log(`Server is starting at PORT: ${port}`);
});