import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL as string,process.env.SUPABASE_SERVICE_KEY as string);

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME as string;

const fileName = `repo-${Date.now()}.txt`;

export default async function uploadFile(filedata : string){

    console.log(`Uploading ${filedata}`);

    if(filedata === "" || filedata === undefined){
        return {
            message:"Empty file",
        }
    }

    const { error : uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName,filedata,{
            contentType : "text/plain",
            upsert: true
        })

    if(uploadError) return uploadError.message

    return {
        message : "Upload Success",
    }

}