import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { TokenStorageService } from '../authentication/token-storage.service'

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(private http:HttpClient, private token:TokenStorageService) {}

  public deleteRepair(id){
    return this.http.delete(BASE_URL + "api/repair/"+ id, this.token.sendTokenServer());
  }
  public getRepair(){
    return this.http.get(BASE_URL + "api/repairs", this.token.sendTokenServer());
  }
  public createRepair(rp){
    return this.http.post(BASE_URL + "api/repair", rp, this.token.sendTokenServer());
  }

  public getCurrentRepair(id){
    return this.http.get(BASE_URL + "api/repair/" + id, this.token.sendTokenServer());
  }

  public editRepair(dp){
    return this.http.put(BASE_URL + "api/repair", dp, this.token.sendTokenServer());
  }

  public getAllDevice(){
    return this.http.get(BASE_URL + "api/device/all", this.token.sendTokenServer());
  }
}
