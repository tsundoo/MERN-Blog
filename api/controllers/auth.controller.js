import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({
        username, 
        email, 
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, "All fields are required"))
    }
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(400, "Invalid Password"));

        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" }
        )
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie("access_token", token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { name, email, avatar } = req.body;
    if (!name || !email ) {
        return next(errorHandler(400, "Name and email are required"))
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "24h" });
            const { password, ...rest } = user._doc;
            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true
                })
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ 
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar: avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: "24h" });
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}