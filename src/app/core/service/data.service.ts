import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }



  call(): Observable<any> {
    return this.http.get("https://graph.microsoft.com/v1.0/me");
  }


}
