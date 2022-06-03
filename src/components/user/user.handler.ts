import { Application, Request, Response } from "express";
import { hashSync, compareSync, genSalt } from "bcrypt";
import { UserStore, User } from "./user.modle";
import { config } from "../../config";

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const indexUsers = await store.index();
        res.json(indexUsers);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const showUser = await store.show(req.params.id);
        res.json(showUser);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const salt = await genSalt(parseInt(config.saltRounds))
        const hash = hashSync(req.body.password + config.pepper, salt)
        const users: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hash,
        }
        const createUsers = await store.create(users);
        res.json(createUsers);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const user_store = (app: Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
}

export default user_store;