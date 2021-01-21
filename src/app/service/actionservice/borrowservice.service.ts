import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { TokenStorageService } from '../authentication/token-storage.service'

const URL_SERVER = BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class BorrowserviceService {

  constructor(private http:HttpClient, private token:TokenStorageService) {}



  // public deleteBorrow(id){
  //   return this.http.delete("http://localhost:8081/api/departments/"+ id);
  // }
  public getDP(){
    return this.http.get(URL_SERVER + "api/regiondepartments", this.token.sendTokenServer());
  }
  public createDP(dp){
    return this.http.post(URL_SERVER + "api/borrow", dp, this.token.sendTokenServer());
  }
  public getCurrentBorrow(id){
    return this.http.get(`${URL_SERVER + "api/borrow/id"}/${id}`, this.token.sendTokenServer());
  }
  public editDp(dp){
    return this.http.put(URL_SERVER + "api/borrow", dp, this.token.sendTokenServer());
  }
  public getBorrow(){
    return this.http.get(URL_SERVER + "api/borrow", this.token.sendTokenServer());
  }
  public deleteBorrow(id){
    return this.http.delete(URL_SERVER + "api/borrow/" + id, this.token.sendTokenServer());
  }
  public getAllBorrow(){
    return this.http.get(URL_SERVER + "api/borrowid", this.token.sendTokenServer());
  }
  public getAllDevice(){
    return this.http.get(BASE_URL + "api/device/all", this.token.sendTokenServer());
  }
}
