import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import RepairModel from "@/models/RepairModel";
import ResponsesModel from "@/models/ResponsesModel";
import ActiveRepairModel from "@/models/ActiveRepairModel";

export async function POST(req) {
    try{
      await connectDB();
      console.log("entered response in server post active")
      const {user,technician,rsol,rcost,rlocation,rmodel,raddress,rappliance,rdesc} = await req.json();
      console.log("the from is ",user)
      console.log("the emailm is ",technician)
      console.log("the description is ",rsol)
      console.log("the cost is ",rcost)
      const newResponse = {
        user:user,
        technician:technician,
        rsolution:rsol,
        rcost:rcost,
        rlocation:rlocation,
        rmodel:rmodel,
        raddress:raddress,
        rappliance:rappliance,
        rdesc:rdesc
      }
      console.log("the new active repair is ",newResponse)
      await ActiveRepairModel.create(newResponse)
      console.log("succesfuly inserted")
      return NextResponse.json({message:"response added succesfully"},{status:200});
    }
    catch(err)
    {
      console.log("error at 264 ",err);
      return NextResponse.json({error:err.message},{status:500});
    }
    finally{
      await disconnectDB();
    }
  }