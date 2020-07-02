import { Router } from 'express';
import TodoController from './controllers/TodoController';

const routes = Router();

routes.get('/todos', TodoController.index);

routes.post('/todos', TodoController.store);

routes.delete('/todos/:id', TodoController.destroy);

routes.put('/todos/:id', TodoController.toggle);

export default routes;