import {Router, Request, Response} from 'express';
import * as mongoose from 'mongoose';
import auth from '../middleware/auth';

export function UserRouter(router: Router = Router()) : Router {
    router.post('/users', createUser);
    router.post('/users/login', loginUser);
    router.post('/users/logout', auth, logoutUser);
    router.post('/users/logoutall', auth, logoutAllUser);

    return router;
}

async function createUser(req: Request, res: Response) {
    try {
        const userModel: any = mongoose.model('user');
        const user = new userModel(req.body);

        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const userModel: any = mongoose.model('user');
        const user = await userModel.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function logoutUser(req: any, res: Response) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        return res.send();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }
}

async function logoutAllUser(req: any, res: Response) {
    try {
        req.user.tokens = [];
        await req.user.save();
        return res.send();
    } catch (e) {
        return res.status(500).send();
    }
}

export default UserRouter;