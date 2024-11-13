import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RepairModel from "@/models/RepairModel";

export async function POST(req) {
  try {
    await connectDB();
    console.log("entered raising in server raising");
    const { remail, rname, rappliance, rmodel, rdesc, rlocation, raddress } = await req.json();
    const newRepair = {
      remail_id: remail,
      rname: rname,
      rappliance: rappliance,
      rmodel: rmodel,
      rdesc: rdesc,
      rlocation: rlocation,
      raddress: raddress,
    };
    console.log("the new record is ", newRepair);
    await RepairModel.create(newRepair);
    console.log("after succesfully inserting here after 133");
    return NextResponse.json(
      { message: "repair added succesfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error occured at server 132 ", err);
    return NextResponse.json(
      { message: "error at adding repair" },
      { status: 500 }
    );
  }
  finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
