import auth from './build/middleware/auth';
import models from './build/models/user';
import UserRouter from './build/routes/user';

module.exports = {
    AuthMiddleware: auth,
    models: {
        schema: models.userSchema,
        createUserModel: models.createUserModel
    },
    UserRouter
};