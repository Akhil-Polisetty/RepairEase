import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user:String,
    technician : String,
    rdesc : String,
    rlocation : String,
    rappliance : String,
    rmodel : String,
    raddress : String,
    rsolution:String,
    rcost:String
    
})

export default mongoose.models.ActiveRepair || mongoose.model("ActiveRepair", UserSchema);
