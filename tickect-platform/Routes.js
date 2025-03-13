import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Create Ticket
router.post("/", async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Ticket
router.put("/:id", async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Ticket
router.delete("/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
