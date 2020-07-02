import express from 'express'; 
import cors from 'cors'; 
import routes from './routes';

class App  {
 public express: express.Application;
 
 public constructor(){
  this.express = express();
  this.config()
  this.routes()
}
 private routes() {
  this.express.use(routes)
 }

 private config() {
  this.express.use(cors()); 
  this.express.use(express.json())
 }
}

new App().express.listen(3333, () => console.log('Server is running :)'));