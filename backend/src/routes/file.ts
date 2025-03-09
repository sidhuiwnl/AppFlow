import {Router ,Response,Request} from "express";
import {exec} from "child_process";
import * as fs from "node:fs";
import {getTxtData} from "../lib/codebaseRead";


const router  = Router();



router.post("/remoteUrl",(req : Request,res: Response)=>{
    const { remoteUrl } = req.body;

    console.log(remoteUrl);

    if(!remoteUrl){
        res.status(404).send("No remote URL found!");
        return;
    }
    try{
       exec(`npx repomix --remote ${remoteUrl}`,async(error,stdout,stderr)=>{
            if (error) return res.status(500).json({ error: error.message });
            if (stderr) return res.status(500).json({ error: stderr });


            if(stdout.includes("Your repository has been successfully packed.")){

                res.status(200).json({
                    status:"success",
                    data: "Now you can chat with the codebase",
                })
                return
            }

            res.status(400).json({
                status: "failed",
                message : "Failed to retrieve sequence code",

            })
           return

        });


    }catch(err){
        res.status(500).json({
            success: false,
            message: "Can't able to perform the task"
        });
        return;
    }

})


router.post("/talk",async (req : Request,res : Response)=>{
    const { prompt } = req.body;

    if(!prompt){
        res.status(404).json({
            success:false,
            message:"No prompt found!"
        })
        return;
    }


    const response = await getTxtData(prompt);

    res.status(200).json({
        status:"success",
        data:response,
        role : "system"
    })
})


export default router;