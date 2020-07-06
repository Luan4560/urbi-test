import { Router } from 'express';
import TodoController from './controllers/TodoController';
import AuthController from './controllers/AuthController';
import auth from './middlewares/auth';
const routes = Router();

routes.get('/todos', auth, TodoController.index);

routes.post('/todos', auth, TodoController.store);

routes.delete('/todos/:id', auth, TodoController.destroy);

routes.put('/todos/:id', auth, TodoController.toggle);

routes.post('/user/register', AuthController.register);

routes.get('/user/register', AuthController.show);

routes.post('/user/signin', AuthController.signIn);


export default routes;