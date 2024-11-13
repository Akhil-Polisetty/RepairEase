import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";

export async function POST(req) {
  try {
    console.log("Entered register page");

    // Parse request body
    const { name, email, phone, city, domain } = await req.json();

    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const existingUser = await RuserModel.findOne({ email_id: email });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("No error up to server 58");

    // Update user information
    const updatedUser = await RuserModel.findOneAndUpdate(
      { email_id: email },
      { $set: { u_name: name, phn_no: phone, city: city, domain: domain } },
      { new: true }
    );

    console.log("Updated user:", updatedUser);

    // Respond with success message
    return NextResponse.json({ message: "Update Completed", updatedUser }, { status: 200 });
  } catch (error) {
    console.log("Error Occurred at server 69:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
