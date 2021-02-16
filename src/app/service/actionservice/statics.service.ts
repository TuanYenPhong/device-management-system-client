import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  constructor(private http:HttpClient) {}

  //code thong ke
  public searchRepair(rp){
    return this.http.post(BASE_URL + "api/statics/search/repair", rp);
  }
  
  public exportRepair(rp) : Observable<Blob>{
    return this.http.post(BASE_URL + "api/statics/export/repair", rp, {responseType: 'blob'});
  }

  //code thong ke device

  public searchDevice(rp){
    return this.http.post(BASE_URL + "api/statics/search/device", rp);
  }
  
  public exportDevice(rp) : Observable<Blob>{
    return this.http.post(BASE_URL + "api/statics/export/device", rp, {responseType: 'blob'});
  }

}
