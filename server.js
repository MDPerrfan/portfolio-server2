import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routers/projectRoute.js';
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Portfolio API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});