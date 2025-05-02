import express from "express";
import connectDb from "./config/dbconfig.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import user from "./routes/user.route.js";
import skills from "./routes/skills.route.js";
import booking from "./routes/booking.route.js";
import review from "./routes/review.route.js";
import tasks from "./routes/taskSchedule.route.js";
import path from "path";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.use("/api/user", user);
app.use("/api/skills", skills);
app.use("/api/bookings", booking);
app.use("/api/review", review);
app.use("/api/task", tasks);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
