import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import RepairModel from "@/models/RepairModel";
import ResponsesModel from "@/models/ResponsesModel";
export async function POST(req) {
    try{

      await connectDB();
      console.log("entered response in server responses")
      const {to,from,desc,cost} =await req.json();
      console.log("the from is ",from)
      console.log("the emailm is ",to)
      console.log("the description is ",desc)
      console.log("the cost is ",cost)
      const newResponse = {
        from:from,
        to:to,
        response_desc:desc,
        res_cost:cost
      }
      await ResponsesModel.create(newResponse)
      console.log("succesfuly inserted")
      return NextResponse.json({message:'succesfully added respnse'},{status:200});
    }
    catch(err)
    {
      console.log("error at 264 ",err);
      return NextResponse.json({message:'error adding response'},{status:500});
    }
    finally{
      disconnectDB();
    }
  }