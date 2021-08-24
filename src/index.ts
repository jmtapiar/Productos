import "reflect-metadata";
import { createConnection, SimpleConsoleLogger } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import router from "./routes/index";
import * as morgan from "morgan";



const PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: 'http://localhost:4200'
}

morgan.token('id', function getId(req) {
  return req.id
})


createConnection().then(async () => {

  // create express app
  const app = express();
  app.use(morgan('common'))
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express.json());
  app.use(router)
  // start express server
  app.listen(PORT, () => {
    console.log(`Server ejecutando en el puerto ${PORT}`);
  });


}).catch(error => console.log(error));
