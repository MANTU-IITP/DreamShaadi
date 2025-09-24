import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
   {
    businessname: { type: String, required: true },
    description: { type: String, required: true },
  
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    landMark: { type: String },
    category: { type: String, required: true },
    rating:{
      type:Number,
      min:0,
      max:5,
      default:0
    },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default  mongoose.model('Vendor', vendorSchema);