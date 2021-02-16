import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';

const URL_SERVER = BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  public getUser(){
    return this.http.get(URL_SERVER  + "api/user");
  }

  public deleteUser(id){
    return this.http.delete(URL_SERVER + "api/user"+ id);
  }

  public createUser(user){
    return this.http.post(URL_SERVER + "api/user", user, {responseType: 'text' as 'json'});
  }

  public getDP(){
    return this.http.get(URL_SERVER + "api/regiondepartments");
  }
}
