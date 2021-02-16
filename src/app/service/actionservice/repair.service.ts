import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(private http:HttpClient) {}

  public deleteRepair(id){
    return this.http.delete(BASE_URL + "api/repair/"+ id);
  }
  public getRepair(){
    return this.http.get(BASE_URL + "api/repairs");
  }
  public createRepair(rp){
    return this.http.post(BASE_URL + "api/repair", rp, {responseType:'text' as 'json'});
  }

  public getCurrentRepair(id){
    return this.http.get(BASE_URL + "api/repair/" + id);
  }

  public editRepair(dp){
    return this.http.put(BASE_URL + "api/repair", dp, {responseType: 'text' as 'json'});
  }

  public getAllDevice(){
    return this.http.get(BASE_URL + "api/device/all");
  }
}
