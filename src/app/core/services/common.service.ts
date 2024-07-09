import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  sendRequest(method: string, endPoint: string, data: any) {
    return this.actualSendRequest(method, endPoint, data);
  }

  actualSendRequest(method: any, endPoint: any, data: any) {
    let endPointUrl: any;
    endPointUrl = `${apiUrl}` + endPoint + ``;
    if (method == 'post') {
      return this.http.post(endPointUrl, data);
    } else if (method == 'put') {
      return this.http.put(endPointUrl, data);
    } else if (method == 'delete') {
      return this.http.delete(endPointUrl);
    } else {
      return this.http.get(endPointUrl);
    }
  }
}
