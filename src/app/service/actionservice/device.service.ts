import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  public deleteDevice(id){
    return this.http.delete(BASE_URL + "api/device/"+ id);
  }

  public createDevice(device){
    return this.http.post(BASE_URL + "api/device", device, {responseType:'text' as 'json'});
  }

  public getCurrentDevice(id){
    return this.http.get(BASE_URL + "api/device/" + id);
  }

  public getAllDevice(){
    return this.http.get(BASE_URL + "api/devices");
  }

  // public getRepair(){
  //   return this.http.get(BASE_URL + "api/repairs");
  // }

  public editDevice(dp){
    return this.http.put(BASE_URL + "api/device", dp, {responseType: 'text' as 'json'});
  }

  public getAllCodeDevice(){
    return this.http.get(BASE_URL + "api/device/all");
  }

}
