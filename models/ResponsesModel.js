import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    from : String,
    to : String,
    response_desc : String,
    res_cost : String
})

export default mongoose.models.Response || mongoose.model("Response", UserSchema);
