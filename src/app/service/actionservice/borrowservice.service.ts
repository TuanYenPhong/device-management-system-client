import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { Observable } from 'rxjs';


const URL_SERVER = BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class BorrowserviceService {

  constructor(private http:HttpClient) {}



  // public deleteBorrow(id){
  //   return this.http.delete("http://localhost:8081/api/departments/"+ id);
  // }

  public getDP(){
    return this.http.get(URL_SERVER + "api/regiondepartments");
  }
  public createDP(dp){
    return this.http.post(URL_SERVER + "api/borrow", dp, {responseType:'text' as 'json'});
  }
  public getCurrentBorrow(id){
    return this.http.get(`${URL_SERVER + "api/borrow/id"}/${id}`);
  }
  public editDp(dp){
    return this.http.put(URL_SERVER + "api/borrow", dp, {responseType: 'text' as 'json'});
  }
  public getBorrow(){
    return this.http.get(URL_SERVER + "api/borrow");
  }
  public deleteBorrow(id){
    return this.http.delete(URL_SERVER + "api/borrow/" + id);
  }
  public getAllBorrow(){
    return this.http.get(URL_SERVER + "api/borrowid");
  }
  public getAllDevice(){
    return this.http.get(BASE_URL + "api/device/all");
  }
  public getUserRegion(){
    return this.http.get(BASE_URL + "api/user/region");
  }
}
