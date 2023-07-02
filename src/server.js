import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config(); //cấu hình lấy port trong .env

let app = express();
app.use(
   cors({
      origin: true,
   }),
);

//config app
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: true,
   }),
);

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
   console.log(`Listening on ${port} successfully`);
});
