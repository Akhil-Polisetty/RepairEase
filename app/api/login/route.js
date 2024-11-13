import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Check if the user exists
    const existingUser = await RuserModel.findOne({ email_id: email });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.passkey);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, "hellosuck", { expiresIn: "1h" });
    const response = NextResponse.json({ message: "Login Successful", token }, { status: 200 });

    // Set token in cookie
    response.cookies.set("token", token, { httpOnly: true, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
