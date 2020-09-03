import bcrypt from "bcryptjs";
import * as usersDb from "../routes/users/usersModel";

interface IUsersMiddleware {
    req: any;
    res: any;
    next: any;
}
//@ts-ignore: todo: is there a way to use an interface to define prop types with a basic function?
export async function restrict(req, res, next) {
    const authError = {message: "Invalid credentials"};
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json(authError);
        }
        next();
    } catch (e) {
        console.log(e.stack);
        next(e);
    }
}