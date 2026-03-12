import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routers/projectRoute.js';
import authRoutes from "./routers/authRoutes.js";
import aboutRoutes from "./routers/aboutRoutes.js";
import messageRoutes from "./routers/messageRoutes.js";
connectDB();
const app = express();
const allowedOrigins = ["http://localhost:3000", "https://welcomeboss.vercel.app"];
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        try {
            const normalizedOrigin = new URL(origin).origin;

            if (
                allowedOrigins.includes(normalizedOrigin) ||
                normalizedOrigin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }

            console.log("Blocked by CORS:", normalizedOrigin);
            return callback(new Error("Not allowed by CORS"));
        } catch (err) {
            console.log("Invalid origin:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
};

app.use(cors(corsOptions));
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