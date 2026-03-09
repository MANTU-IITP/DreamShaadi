import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["couple", "vendor", "admin"], default: "couple" },
    vendorProfile: {
      businessName: { type: String, default: "" },
      category: { type: String, default: "" },
      city: { type: String, default: "" },
      phone: { type: String, default: "" },
      about: { type: String, default: "" },
      profileImage: { type: String, default: "" },
      completed: { type: Boolean, default: false },
    },
    vendor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
   
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
