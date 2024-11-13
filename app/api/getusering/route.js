import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Get email from query parameters
    const { searchParams } = new URL(req.url);
    const email_glob = searchParams.get("email");

    if (!email_glob) {
      return NextResponse.json({ message: "Email parameter is required" }, { status: 400 });
    }

    // Find the user in the database
    const user = await RuserModel.findOne({ email_id: email_glob });

    // Return user if found, else return a 404 response
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (err) {
    console.log("Error occurred:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
