import {Router ,Response,Request} from "express";
import uploadFile from "../controllers/supabase";
import {exec} from "child_process";
import * as fs from "node:fs";
import * as path from "node:path";

const router  = Router();



router.post("/remoteUrl",(req : Request,res: Response)=>{
    const { remoteUrl } = req.body;



    if(!remoteUrl){
        res.status(404).send("No remote URL found!");
        return;
    }
    try{
       exec(`npx repomix  --remote ${remoteUrl}`,async(error,stdout,stderr)=>{
            if (error) return res.status(500).json({ error: error.message });
            if (stderr) return res.status(500).json({ error: stderr });

            console.log(stdout)
            if(stdout.includes("Your repository has been successfully packed.")){
                fs.readFile('repomix-output.txt',"utf-8",async (err,data)=>{
                    const response = await uploadFile(data)

                    console.log(response)
                })
            }

            res.status(200).json({
                status: "success",
                message : "File created successfully",

            })

        });


    }catch(err){
        res.status(500).json({
            success: false,
            message: "Can't able to perform the task"
        });
        return;
    }

})


export default router;