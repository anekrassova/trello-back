import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();

export class UserService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
    }

    // метод для регистрации пользователей
    async register(email, password) {
        try {
            // проверка email и пароля
            if (
                !email ||
                !password ||
                password.length < 6 ||
                !this.isValidEmail(email)
            ) {
                throw { status: 400, message: "Invalid email or password provided." };
            }

            // проверка существования пользователя в базе данных
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw {
                    status: 400,
                    message: "Provided email already exists in the system.",
                };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();

            return { status: 200, message: "A user was successfully registered." };
        } catch (error) {
            console.error("Error in register method:", error);
            return {
                status: error.status || 500,
                message: error.message || "Internal server error.",
            };
        }
    }

    isValidEmail(email) {
        const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
        return regex.test(email);
    }

    // метод для логина пользователй
    async login(email, password) {
        try {
            // если email или пароль не переданы
            if (!email || !password) {
                throw {
                    status: 400,
                    message: "Email and password fields should not be empty.",
                };
            }

            // если передан не валидный email
            if (!this.isValidEmail(email)) {
                throw { status: 400, message: "Invalid email format." };
            }

            // поиск пользователя в базе
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw {
                    status: 400,
                    message: "User with provided email does not exists in the system.",
                };
            }

            // проверка совпадений пароля
            const isPasswordCorrect = await bcrypt.compare(
                password,
                existingUser.password,
            );
            if (!isPasswordCorrect) {
                throw { status: 400, message: "Incorrect password provided." };
            }

            // создание jwt токена
            const token = jwt.sign(
                { id: existingUser._id, email: existingUser.email },
                this.jwtSecret,
                { expiresIn: "1h" },
            );

            // возвращение токена и объекта пользователя без пароля
            const userWithoutPassword = {
                email: existingUser.email,
            };

            return {
                status: 200,
                message: "A user was successfully logged in.",
                token,
                user: userWithoutPassword,
            };
        } catch (err) {
            throw {
                status: 500,
                message: "Internal server error.",
                error: err.message,
            };
        }
    }
}
