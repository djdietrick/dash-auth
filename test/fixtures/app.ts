import * as express from 'express';
import * as mongoose from 'mongoose';
import {UserRouter} from '../../src/routes/user';
import models from '../../src/models/user';
let bodyParser = require('body-parser');

export class App {
    public express: express.Application;
    public userModel: mongoose.Model<any>;

    constructor() {
        this.initModel();
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.initRouter();
    }

    private initModel() {
        this.userModel = mongoose.model('user', models.userSchema);
    }

    private initRouter() {
        this.express.use(UserRouter());
    }
}