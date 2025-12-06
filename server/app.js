import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();

// Allow local dev origins for convenience. In production, restrict this appropriately.
app.use(
    cors({
        origin: (origin, cb) => {
            // allow requests with no origin (e.g. curl, mobile apps)
            if (!origin) return cb(null, true);
            // allow localhost on common dev ports
            if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1") || origin.startsWith("http://[::1]")) {
                return cb(null, true);
            }
            cb(new Error("Not allowed by CORS"));
        },
    })
);

app.use(express.json());

// Mount routes
app.use("/api/tasks", tasksRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));