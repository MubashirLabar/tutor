import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import env from './config/env.config.manager';
import Routes from './routes';
import * as path from 'path';
import * as fs from 'fs';

class App {
  public app: express.Application;
  public dbUrl: string = env.getEnvValue('DB_URL');
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.setRoutes();
    this.checkDir();
  }

  private checkDir(): void {
    const dir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private setRoutes(): void {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('App is up & running.');
    });
    this.app.use('/v1/api', Routes.router);
    this.app.use('/static', express.static(path.join(__dirname, '../public')));
  }
  private config(): void {
    // support application/json type post data

    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: env.getEnvValue('SECRET'),
        resave: true,
        saveUninitialized: false,
        cookie: { secure: true }
      })
    );
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log('Connected to MongoDB!');
      })
      .catch((err) => {
        console.log('mongodb error: ', err);
      });
  }
}
export default new App().app;
