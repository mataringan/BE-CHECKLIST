const User = require("../models/user");
const { v4: uuid } = require("uuid");
const { encryptPassword, checkPassword } = require("../utils/password");
const { createToken } = require("../utils/createToken");

module.exports = {
    async register(req, res) {
        try {
            const { username, email } = req.body;
            const password = await encryptPassword(req.body.password);

            if (!email || !password) {
                return res.status(400).json({
                    status: "error",
                    message: "Email and password is required",
                });
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: "error",
                    message: "Email format is invalid",
                });
            }

            const findEmail = await User.findOne({
                email: email,
            });

            if (findEmail) {
                return res.status(400).json({
                    status: "error",
                    message: "email already exist",
                    data: {},
                });
            }

            const createUser = await User.create({
                _id: uuid(),
                username,
                email,
                password,
            });

            const formattedResponse = {
                _id: createUser._id,
                username: createUser.username,
                email: createUser.email,
            };

            res.status(201).json({
                status: "success",
                message: "Successfully created an account",
                data: formattedResponse,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const usernameUser = await User.findOne({
                username,
            });

            if (!usernameUser) {
                return res.status(404).json({
                    status: "error",
                    message: "user not found",
                });
            }

            const isPasswordCorrect = await checkPassword(
                usernameUser.password,
                password
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    status: "error",
                    message: "password salah!",
                });
            }

            const token = createToken({
                _id: usernameUser._id,
                email: usernameUser.email,
                // createdAt: usernameUser.createdAt,
                // updatedAt: usernameUser.updatedAt,
            });

            res.status(201).json({
                status: "success",
                token,
                username: usernameUser.username,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },
};
