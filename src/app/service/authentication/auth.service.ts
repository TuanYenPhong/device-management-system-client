import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const URL_SERVER = BASE_URL;
// const URL_SERVER = "http://localhost:8081/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(auth): Observable<any> {
    return this.http.post(URL_SERVER + 'api/auth/login',{
      username: auth.username,
      password: auth.password
    }, httpOptions);
  }

  register(user): Observable<any>{
    return this.http.post(URL_SERVER + 'api/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.email,
    }, httpOptions);
  }
}
