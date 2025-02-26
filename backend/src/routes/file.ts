import {Router ,Response,Request} from "express";
import {exec} from "child_process";
import * as fs from "node:fs";
import {cleanSequenceCode, getSequenceDiagram} from "../lib/codebaseRead";


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


            if(stdout.includes("Your repository has been successfully packed.")){
                const data=  fs.readFileSync('repomix-output.txt',"utf-8");

                const response = await getSequenceDiagram(data);



                const sequenceCode = cleanSequenceCode(response);

                res.status(200).json({
                    status:"success",
                    message : sequenceCode
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

// router.get("/sequenceResponse",async (req : Request,res : Response)=>{
//     try {
//        const data=  fs.readFileSync('repomix-output.txt',"utf-8");
//
//        const response = await getSequenceDiagram(data);
//
//
//
//        const sequenceCode = cleanSequenceCode(response);
//
//        res.status(200).json({
//            status: "success",
//             message: sequenceCode,
//        })
//
//
//     }catch(err){
//         res.status(500).json({
//             success: false,
//             message: "Can't able to perform the task"
//         })
//         return
//     }
// })


export default router;