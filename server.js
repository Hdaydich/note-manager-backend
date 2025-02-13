
const express = require('express');
const bodyParser= require('body-parser');
const usersRoutes= require('./routes/users-routes');
const notesRoutes= require('./routes/notes-routes');
const HttpError = require('./models/http-error');
const mongoose= require('mongoose');
const path = require('path');


const app=express();

app.use(bodyParser.json());

// app.use(express.static(path.join('public')));

app.use((req,res,next)=>{

   res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
  });

app.use('/api/notes',notesRoutes);
app.use('/api/users',usersRoutes);

// app.use((req,res,nex)=>{
//    res.sendFile(path.resolve(__dirname,'public','index.html'));
// });



app.use((error,req,res,next)=>{
    if(res.headerSent){
       return next(error);
    }
    res.status(error.code||500);
    res.json({message:error.message||'An unknoun error occurred!'});
   });

   mongoose.connect(`mongodb+srv://admin:admin@cluster0.wa8hr.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{

   app.listen(process.env.PORT);

}).catch(err=>{console.log(err)});

