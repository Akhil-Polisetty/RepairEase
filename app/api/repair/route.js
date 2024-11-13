import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import RepairModel from "@/models/RepairModel";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Extract email from query parameters
    const { searchParams } = new URL(req.url);
    const email_glob = searchParams.get("email");

    if (!email_glob) {
      return NextResponse.json({ message: "Email parameter is required" }, { status: 400 });
    }

    // Find the user by email
    const user = await RuserModel.findOne({ email_id: email_glob });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find repairs based on user's location and appliance domain
    const repairs = await RepairModel.find({ rlocation: user.city, rappliance: user.domain });

    // Check if repairs were found
    if (repairs.length > 0) {
      console.log("Repairs found:", repairs);
      return NextResponse.json(repairs, { status: 200 });
    } else {
      return NextResponse.json({ message: "No repairs found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error occurred:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
