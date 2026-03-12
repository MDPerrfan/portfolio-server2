import Message from "../models/Message.js";

// Public — called from portfolio contact form
export const submitContact = async(req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMessage = await Message.create({ name, email, message });
        res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Protected — dashboard only
export const getMessages = async(req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        const unreadCount = await Message.countDocuments({ read: false });

        res.json({ success: true, messages, unreadCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Protected — mark single message as read
export const markAsRead = async(req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id, { read: true }, { returnDocument: "after" }
        );
        if (!message) return res.status(404).json({ success: false, message: "Message not found" });
        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Protected — delete a message
export const deleteMessage = async(req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ success: false, message: "Message not found" });
        res.json({ success: true, message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};