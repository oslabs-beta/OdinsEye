const path = require('path');
const express = require('express');
import { Request, Response, NextFunction } from 'express';
import dashboardRouter from './routes/dashboard'
// import { resourceLimits } from 'worker_threads';
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

if (process.env.NODE_ENV) {
  app.use('/', express.static(path.join(__dirname, '../dist')));
}

app.use('/api/dashboard', dashboardRouter);

// app.get('/dashboard', (req: Request, res: Response) => {
//   return res.status(200).send('hi')
// })


//redirect to page 404 when endpoint does not exist
app.use('*', (req: Request, res: Response) =>{
  return res.status(404).send('404 Page Not Found')
});


//global error handling
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
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

module.exports = app;
