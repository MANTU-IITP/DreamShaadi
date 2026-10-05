import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import authRouter from "./routes/AuthRouter.js";
import vendorRouter from "./routes/vendor.routes.js";
import adminRouter from "./routes/admin.routes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wedplaner";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// express-mongo-sanitize's middleware reassigns req.query, which is read-only in Express 5.
// Its sanitizer itself is compatible, so sanitize each request object in place.
app.use((req, res, next) => {
  ["body", "params", "query"].forEach((key) => {
    if (req[key]) mongoSanitize.sanitize(req[key]);
  });
  next();
});

app.use("/auth", authRouter);
app.use("/vendor/post", vendorRouter);
app.use("/vendor/post", bookingRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({ message: "DreamShaadi API", status: "ok" });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("db connected");
    app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exitCode = 1;
  }
};

startServer();

