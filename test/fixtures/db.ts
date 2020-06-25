import * as mongoose from 'mongoose';

export async function connectToDb() {

    mongoose.connect('mongodb://localhost:27017/auth-test', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        //console.log("Successfully connected to database");
    }).catch((err) => {
        console.log("Error connecting to database: ", err);
    });
}

export async function dropDb() {
    //await mongoose.connection.collection('auth-test').drop();
    await mongoose.connection.db.dropCollection('users');
}