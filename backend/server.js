const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
   res.send('API is Running...');
})

app.get("/api/notes",(req,res)=>{ 
   res.json(notes);
})
app.get('/api/data', (req, res) => {
   res.json({ message: 'Hello from the backend!' });
});
app.get('/api/notes/:id',(req,res)=>{
    const note = notes.find((n=>n._id === req.params.id))
    res.json(note);
 }) 

 app.use('/api/users',userRoutes);
 

 // error middlewares
 app.use(notFound);
 app.use(errorHandler);

 const PORT = process.env.PORT || 5000;

 app.listen(PORT,console.log(`server is running at ${PORT}`));