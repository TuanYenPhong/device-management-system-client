import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';

const URL_SERVER = BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) {}

  public updatePassword(newpass){
    return this.http.put(URL_SERVER  + "api/auth/password_reset", newpass);
  }

  public sendMail(email){
    return this.http.get(URL_SERVER  + "api/auth/password_reset/" + email);
  }
}
