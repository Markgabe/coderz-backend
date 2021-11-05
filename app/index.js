import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import https from 'https';
import path from 'path';
import fs from 'fs';

import router from './routes';

const homedir = require('os').homedir();
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(router);

if (process.env.ENVIRONMENT !== 'development') {
  const httpsServer = https.createServer({
    cert: fs.readFileSync(path.join(homedir, 'cert', 'certificate.crt')),
    ca: fs.readFileSync(path.join(homedir, 'cert', 'ca_bundle.crt')),
    key: fs.readFileSync(path.join(homedir, 'cert', 'private.key')),
  }, app);

  httpsServer.listen(process.env.HTTPS_PORT || 3443);
}

app.listen(process.env.PORT || 3333);
