import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators';
import  { IUserData }  from '../models/UserData'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class UserInfo {
  private url = 'http://localhost:3333/users';

  constructor(private http: HttpClient) { }
  

  getUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>(this.url)
    .pipe(
      retry(2),
      )
    }


  newUser(user: IUserData) {
    const requestBody = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    
    console.log(requestBody)
    
    return this.http.post(
      this.url,
      requestBody
      )
    }
  }



