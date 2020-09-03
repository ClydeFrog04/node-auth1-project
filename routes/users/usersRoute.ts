import express from "express";
import bcrypt from "bcryptjs";
import * as usersDb from "../../routes/users/usersModel";
import {restrict} from "../../middleware/usersMiddleware";

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

usersRouter.post("/login", async (req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await usersDb.findBy({username}).first();
        const passValid = bcrypt.compare(password, user.password);

        if(!user || !passValid) res.status(401).json({message: "Invalid credentials"});

        //@ts-ignore: TS2532: Object is possibly 'undefined'.
        req.session.user = user;

        res.json({message: `Welcome ${user.username}`});

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error logging in"});
    }
});

usersRouter.get("/users", restrict, async (req, res) => {
    try {
        const users = await usersDb.find();
        res.status(200).json(users);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting users"});
    }
    /*
    router.get("/users", usersMiddleware.restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find());
    } catch (err) {
        next(err);
    }
});
     */
});