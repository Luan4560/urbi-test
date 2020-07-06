import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from'./components/template/sign-in/sign-in.component';
import { SignUpComponent } from './components/template/sign-up/sign-up.component';
import {TodoListComponent} from './components/template/todo-list/todo-list.component';

const routes: Routes = [
   {path: "", component: SignInComponent},
  {path: "signup",  component: SignUpComponent },
  {path: "todo",  component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
