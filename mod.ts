import auth from './src/middleware/auth';
import models from './src/models/user';
import UserRouter from './src/routes/user';

module.exports = {
    AuthMiddleware: auth,
    Schema: models.userSchema,
    UserRouter
};