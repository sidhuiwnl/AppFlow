import express from "express";
import cors from "cors";
const app = express();
import fileRoutes from "./routes/file";
import dotenv from "dotenv";

dotenv.config();

app.use(cors());
app.use(express.json());


app.use("/api/v1/file",fileRoutes)








app.listen(3000,() =>{
    console.log("Server running on port 3000")
})