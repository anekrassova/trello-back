import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 3000;

const db = process.env.MONGO_URI.replace(
    "${DB_PASSWORD}",
    process.env.DB_PASSWORD,
);

mongoose
    .connect(db)
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
