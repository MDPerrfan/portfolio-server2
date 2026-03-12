import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routers/projectRoute.js';
import authRoutes from "./routers/authRoutes.js";
import aboutRoutes from "./routers/aboutRoutes.js";
import messageRoutes from "./routers/messageRoutes.js";
connectDB();
const app = express();
const allowedOrigins = ["http://localhost:3000", "https://portfolio-server2-five.vercel.app/"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/messages", messageRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Portfolio API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});