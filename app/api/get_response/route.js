import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import RepairModel from "@/models/RepairModel";
import ResponsesModel from "@/models/ResponsesModel";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email_glob = searchParams.get("email");

    console.log(email_glob);
    const responses = await ResponsesModel.find({ to: email_glob });

    if (responses.length > 0) {
      console.log("Repairs found:", responses);
      return NextResponse.json(responses, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No responses found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("error in server", error.message);
  } finally {
    await disconnectDB();
  }
}
