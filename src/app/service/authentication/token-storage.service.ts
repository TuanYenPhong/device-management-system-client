import { Injectable } from '@angular/core';
import { HttpHeaders  } from '@angular/common/http';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem(USER_KEY)));
  }

  public sendTokenServer(): any {
    
    const header = {
      headers : new HttpHeaders().set(
        "Authorization",
        "Bearer " + JSON.parse(localStorage.getItem("auth-user"))["token"]
      ),
      responseType:'text' as 'json'
    }
    //console.log(JSON.parse(localStorage.getItem("auth-user"))["token"]);
    return header;

    // const token = JSON.parse(localStorage.getItem("auth-user"))["token"];
    // const header = new Headers({ 'Authorization': `Bearer ${token}` });
    // const options = {
    //    headers: header,
    // };
    // console.log(JSON.parse(localStorage.getItem("auth-user"))["token"]);
    // return options;
  }
  
}
