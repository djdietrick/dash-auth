const jwt = require('jsonwebtoken');
import * as mongoose from 'mongoose';
import {Request, Response, NextFunction} from 'express';

async function auth (req: any, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userModel = mongoose.model('user');
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error(`User not found, Id [${decoded._id}], Token [${token}]`);
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e.message);
        return res.status(401).send({ error: 'Please authenticate.' });
    }
}

export default auth;
