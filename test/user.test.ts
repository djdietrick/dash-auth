import {App} from './fixtures/app';
import {connectToDb, dropDb} from './fixtures/db';
import * as request from 'supertest';

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await dropDb();
});

const app = new App();

test('Create User', async () => {
    await request(app.express).post('/users')
        .send({
            name: "David Dietrick",
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(201);
    
    const users = await app.userModel.find();
    expect(users.length).toBe(1);
    const userModel = users[0];
    expect(userModel.tokens.length).toBe(1);
});

test('Login/Logout User', async () => {
    const loginRes = await request(app.express).post('/users/login')
        .send({
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(200);
    
    const user = loginRes.body.user;
    expect(user.name).toBe("David Dietrick");
    const token = loginRes.body.token;

    let users = await app.userModel.find();
    expect(users.length).toBe(1);
    let userModel = users[0];
    expect(userModel.tokens.length).toBe(2); // For some reason, the token is the same, maybe timing issue
    expect(token).toBe(userModel.tokens[1].token);
    

    await request(app.express).post('/users/logout')
        .set({"Authorization": "Bearer " + token}).expect(200);

    users = await app.userModel.find();
    userModel = users[0];
    expect(userModel.tokens.length).toBe(0);
});
