const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
   res.send('API is Running...');
})

 app.use('/api/users',userRoutes);
 app.use("/api/notes",noteRoutes);

// --------------Deployement-----------------

// signify current working directory to build are frontend build folder
 const __dirname1 = path.resolve();

 if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname1,"/frontend/build")));

   // api call
   app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))  
   })
 }else{
   app.get("/",(req,res)=>{
      res.send("API Is Running Successfully");
   })
 }

 // --------------Deployement-----------------

 // error middlewares
 app.use(notFound);
 app.use(errorHandler);

 const PORT = process.env.PORT || 5000;

 app.listen(PORT,console.log(`server is running at ${PORT}`));