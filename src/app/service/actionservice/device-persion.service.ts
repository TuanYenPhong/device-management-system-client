import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { Observable } from 'rxjs';


const URL_SERVER = BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class DevicePersionService {

  constructor(private http:HttpClient) {}

  public getDevicePersion(){
    return this.http.get(URL_SERVER + "api/device_person");
  }

  public getUserRegion(){
    return this.http.get(BASE_URL + "api/user/region");
  }

  public createDP(dp){
    return this.http.post(URL_SERVER + "api/device_person", dp, {responseType:'text' as 'json'});
  }

  public deleteDevice(id){
    return this.http.delete(URL_SERVER + "api/device_person/" + id);
  }

  public getCurrentDevice(id){
    return this.http.get(URL_SERVER + "api/device_person/" + id);
  }

  public editDp(dp){
    return this.http.put(URL_SERVER + "api/device_person", dp, {responseType: 'text' as 'json'});
  }


}
