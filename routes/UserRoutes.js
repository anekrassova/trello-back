import express from "express";
import { UserService } from "../services/UserService.js";

const router = express.Router();
const userService = new UserService();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userService.register(email, password);
        res.status(result.status).json({ message: result.message });
    } catch (err) {
        console.error("Error while user registration: ", err);

        res
            .status(err.status || 500)
            .json({ message: err.message || "Internal server error." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userService.login(email, password);
        res.status(result.status).json({
            message: result.message,
            token: result.token,
            user: result.user,
        });
    } catch (err) {
        console.error("Error while user login: ", err);

        res
            .status(err.status || 500)
            .json({ message: err.message || "Internal server error." });
    }
});

export default router;
