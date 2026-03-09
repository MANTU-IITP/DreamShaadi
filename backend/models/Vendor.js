import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
   {
    businessname: { type: String, required: true },
    description: { type: String, required: true },
  
    image1: { type: String, required: true },
    image2: { type: String, default: "" },
    image3: { type: String, default: "" },
    galleryImages: [{ type: String }],
    galleryVideos: [{ type: String }],
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],
    price: { type: Number, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: "" },
    landMark: { type: String },
    category: { type: String, required: true },
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    approvalNote: { type: String, default: "" },
    approvedAt: { type: Date, default: null },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rating:{
      type:Number,
      min:0,
      max:5,
      default:0
    },
    viewsCount: { type: Number, default: 0 },
    viewLogs: [
      {
        viewerName: { type: String, default: "" },
        viewerEmail: { type: String, default: "" },
        viewerPhone: { type: String, default: "" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    checkIns: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        eventDate: { type: Date, required: true },
        guests: { type: Number, default: 0 },
        message: { type: String, default: "" },
        status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default  mongoose.model('Vendor', vendorSchema);
