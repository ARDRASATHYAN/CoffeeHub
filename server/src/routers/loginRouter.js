const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const userModel = require('../models/userModel');



const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {

    const { username, password } = req.body;
    try {

        if (username && password) {
            const oldUser = await loginModel.findOne({ username });
            const oldUser1 = await userModel.findOne({ login_id: oldUser._id });

            console.log("hadfghh", oldUser);

            if (!oldUser)
                return res
                    .status(404)
                    .json({ success: false, error: true, message: "User doesn't Exist" });
            const isPasswordCorrect = await bcrypt.compare(
                password,
                oldUser.password
            );
            if (!isPasswordCorrect)
                return res
                    .status(400)
                    .json({ success: false, error: true, message: 'Incorrect password' });


            const token = jwt.sign(
                {
                    userId: oldUser._id,

                    userName: oldUser.username,
                },
                'secret_this_should_be_longer',
                { expiresIn: '1h' }
            );
            console.log('token', token);
            if (oldUser) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    token: token,
                    expiresIn: 3600,
                    loginId: oldUser._id,
                    role:oldUser.role,
                    userName: oldUser.username,

                });
            }

        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required!',
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = loginRouter;