import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import RepairModel from "@/models/RepairModel";
import ResponsesModel from "@/models/ResponsesModel";
import ActiveRepairModel from "@/models/ActiveRepairModel";

export async function GET(req) {

  try{
    await connectDB();
    const {searchParams}=new URL(req.url);
    const email_glob = searchParams.get('email');
    console.log(email_glob);
    try{
      const activerepaires=await ActiveRepairModel.find({ user:email_glob});
      if(activerepaires.length>0)
      {
        return NextResponse.json(activerepaires,{message:"there are active repaires"},{status:200});
      }
      else{
        return NextResponse.json({message:"No active repairs"},{status:200});
      }
    }
    catch(err)
      {
        return NextResponse.json({message:"DB error"},{status:404});
      }
    }
    catch(err)
    {
      return NextResponse.json({message:"Server error"},{status:500});
    }
    finally{
      await disconnectDB();
    }
}