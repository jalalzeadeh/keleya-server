import {User} from "./models/users.model";
import express from "express";
import {Sequelize} from 'sequelize-typescript'
import UserRouter from './routes/users.routes'
import bodyParser from 'body-parser';
import {CustomError} from "./utils/custom-error";
import config from './utils/config';

const app = express();
const port = config.port || 4000; // default port to listen

app.use(bodyParser());

const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || config.db.database,
  dialect: config.db.dialect,
  username: process.env.POSTGRES_USER || config.db.username,
  password: process.env.POSTGRES_PASSWORD || config.db.password,
  models: [User],
})

app.use("/api", UserRouter);



app.use((err, req, res, next) => {

  const errorObj = {
    message: 'internal_server_error',
    statusCode: 500,
    code: 500,
    details: null
  }
  if (err instanceof CustomError) {
    errorObj.message = err.message;
    errorObj.statusCode = err.statusCode;
    errorObj.details = err.details;
    errorObj.code = err.code;
  }
  return res.status(errorObj.statusCode).send(errorObj);
})

app.use(function (req, res, next) {
  res.status(404);
  res.send({
    message: 'not_found'
  })
});

// start the Express server
app.listen(port, async () => {
  await sequelize.sync({
    force: true
  })
  console.log(`server started at http://localhost:${port}`);
});
