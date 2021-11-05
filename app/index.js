import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/.well-known/pki-validation/godaddy.html', (req, res) => { res.send('sndiv9ldc27v0vg1r8eka8lode'); });
app.use(router);

app.listen(process.env.PORT || 3333);
