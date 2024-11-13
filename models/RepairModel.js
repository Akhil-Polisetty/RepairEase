import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    remail_id:String,
    rname : String,
    rdesc : String,
    rlocation : String,
    rappliance : String,
    rmodel : String,
    raddress : String
    
})

export default mongoose.models.Repair || mongoose.model("Repair", UserSchema);
