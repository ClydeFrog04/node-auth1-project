import express from "express";
import bcrypt from "bcryptjs";
import * as usersDb from "../../routes/users/usersModel";

export const usersRouter = express.Router();


usersRouter.post("/register", async (req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await usersDb.findBy({username}).first();

        if(user) return res.status(409).json({message: "Username is already taken"});

        const newUser = await usersDb.add({
            username,
            password: await bcrypt.hash(password, 13),
        });
        res.status(201).json(newUser);

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error creating new user"});
    }
});