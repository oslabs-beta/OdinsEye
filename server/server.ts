const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
import { Request, Response, NextFunction } from 'express';
import dashboardRouter from './routes/dashboard';
import kubernetesRouter from './routes/kubernetes';
import { resourceLimits } from 'worker_threads';
import { ErrorType } from '../types';
import axios from 'axios';

const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set cookie to help page persist through refresh
app.use((req: Request, res: Response, next: NextFunction) => {
  const cookie: string = req.cookies.cookieName;
  if(cookie == undefined){
    let randomNum = Math.random().toString();
    randomNum = randomNum.substring(2, randomNum.length);
    res.cookie('cookieName', randomNum, {maxAge: 90000, httpOnly: true});
  }
  return next();
});

if (process.env.NODE_ENV) {
  app.use('/', express.static(path.join(__dirname, '../dist')));
}

app.use('/kubernetes', (req: Request, res: Response) => {
  express.static(path.join(__dirname, '../client/index.html'));
});

app.use('/mongo', (req: Request, res: Response) => {
  express.static(path.join(__dirname, '../client/index.html'));
});

app.use('/api/dashboard', dashboardRouter);

app.use('/api/kubernetesMetrics', kubernetesRouter);

app.get('/dashboard', (req: Request, res: Response) => {
  return res.status(200).send('hi');
});

//network received/transmitted

// async function send(res: Response, namespace: string) {
//   const start = new Date(Date.now() - 10000).toISOString();
//   const end = new Date(Date.now()).toISOString();
//   const cpuQuery = `sum(rate(container_cpu_usage_seconds_total{container="", namespace=~"${namespace}"}[10m]))`;
//   const response = await axios.get(
//     `http://localhost:9090/api/v1/query_range?query=${cpuQuery}&start=${start}&end=${end}&step=5m`
//   );
//   const data = response.data.data.result[0].values;
//   const newData = `data: ${JSON.stringify(data)}\n\n`;
//   res.write(newData);
//   setTimeout(() => send(res, namespace), 3000);
// }

// app.use('/live/:namespace', async (req: Request, res: Response) => {
//   const { namespace } = req.params;
//   // console.log(namespace);
//   const headers = {
//     'Content-Type': 'text/event-stream',
//     Connection: 'keep-alive',
//     'Cache-Control': 'no-cache',
//   };
//   res.writeHead(200, headers);
//   send(res, namespace);
//   req.on('close', () => {
//     console.log('connection closed');
//   });
// });

//redirect to page 404 when endpoint does not exist
app.use('*', (req: Request, res: Response) => {
  return res.status(404).send('404 Page Not Found');
});

//global error handling

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ErrorType = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start app on port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

setTimeout;
module.exports = app;
