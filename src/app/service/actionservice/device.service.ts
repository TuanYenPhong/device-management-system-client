import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { TokenStorageService } from '../authentication/token-storage.service'
import { HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient, private token:TokenStorageService) { }

  public deleteDevice(id){
    return this.http.delete(BASE_URL + "api/device/"+ id, this.token.sendTokenServer());
  }

  public createDevice(device){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("auth-user"))["token"]
   });
   console.log(reqHeader);
   console.log(JSON.parse(localStorage.getItem("auth-user"))["token"]);
    return this.http.post(BASE_URL + "api/device", device, { headers: reqHeader });
  }

  public getCurrentDevice(id){
    return this.http.get(BASE_URL + "api/device/" + id, this.token.sendTokenServer());
  }

  public getAllDevice(){
    return this.http.get(BASE_URL + "api/devices", this.token.sendTokenServer());
  }

  // public getRepair(){
  //   return this.http.get(BASE_URL + "api/repairs");
  // }

  public editDevice(dp){
    return this.http.put(BASE_URL + "api/device", dp, this.token.sendTokenServer());
  }

}
