import express from "express";

const app = express();
import fileRoutes from "./routes/file";

app.use(express.json());


app.use("/api/v1/file",fileRoutes)








app.listen(3000,() =>{
    console.log("Server running on port 3000")
})