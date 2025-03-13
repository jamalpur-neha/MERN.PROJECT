import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
