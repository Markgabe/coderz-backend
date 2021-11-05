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
app.get('/.well-known/pki-validation/A37BA752A9687A1E1947DCD40C9400EF.txt', (req, res) => {
  res.send(
    `5BDF29BFFB5FD05117673C7FCF437827D8C72739FF35E12920962A2FA06CEC56
comodoca.com
32dc348b9b4fea2`,
  );
});
app.use(router);

app.listen(process.env.PORT || 3333);
