import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    u_name : String,
    email_id : String,
    phn_no : String,
    city : String,
    passkey : String,
    tech_stat:String,
    domain:String
})

export default mongoose.models.Reuser || mongoose.model("Reuser", UserSchema);
