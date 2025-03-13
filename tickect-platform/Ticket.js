import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
