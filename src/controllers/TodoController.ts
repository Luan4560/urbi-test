import { Request, Response } from 'express';
import { uuid } from 'uuidv4' ;

interface ITodo {
  id: string,
  title: string,
  checked: boolean,
}

let todos:ITodo[] = [];

class TodoController {  
  
  public index(req: Request, res:Response) {
    console.log(todos)
    return res.status(200).json(todos)
  }

  public store(req: Request, res:Response) {
    const {title } = req.body;
    
    if(title) {
      const newTodo:ITodo = {
        id: uuid(), 
        checked: false,
        title
      }
  
      todos.push(newTodo);
      return res.status(200).json({message: 'Success'})
    } 

    return res.status(400).json({error: 'Title must be provided' })

  }

  public destroy (req: Request, res:Response) {
    const {id} = req.params;

    if(id) {
      
      if(!todos.find(todo => todo.id === id)) return res.status(400).json({message: "Todo with id has been not found"});

      todos = todos.filter((todo: ITodo) => todo.id !== id);
      return res.status(200).json({message: `Todo with id ${id} successfully deleted `})
    }
    return res.status(400).json({message: "Todo id must be provided"});
  }

  public toggle (req: Request, res:Response) {
    const {id} = req.params;

    if(!id) {
      return res.status(400).json({error: 'Id must be provided'});
    }

    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        console.log({...todo, checked: !todo.checked})
        return {...todo, checked: !todo.checked}
      }
        return todo;
    })

    if(todos === newTodos) return res.status(400).json({error: 'Todo is not exists '})
    todos = newTodos;
    return res.status(200).json({message: "Todo toggled successfully"})
  }

}

export default new TodoController();