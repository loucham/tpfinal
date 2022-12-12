require('dotenv').config(); 
const express=require('express')
const app=express(); 
const cors=require('cors')
const connection=require('./config/db'); 
const RouteUser=require('./routes/api/users'); 
const auth = require('./routes/api/auth')

//connection
connection();


//middleware 
app.use(express.json());
app.use(cors());


//routes
app.use('/api/users',RouteUser); 
app.use('/api/auth',auth);



const port=process.env.port||5000; 
app.listen(port,()=> console.log(`server started on port ${port}`))
