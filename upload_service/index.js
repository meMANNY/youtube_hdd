import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    allowedHeaders:["*"],
    origin: "*",
}));

app.use(express.json());
app.use('/upload', uploadRouter);
app.get("/",(req,res)=>{
    res.send("HHld Youtube");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);  
});