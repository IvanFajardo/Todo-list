import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseURL = JSON.parse(localStorage.getItem('store')).baseUrl;

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-type', 'application/json');
    return headers;
  }

  getJson() {
    const headers = this.getHeaders();
    return this.http.get(this.baseURL, { headers } );
  }


  addJson(data) {
    const headers = this.getHeaders();
    return this.http.post(this.baseURL,  data  , { headers });
  }

  updateJson(data, id) {
    const headers = this.getHeaders();
    console.log(data);
    return this.http.put(this.baseURL + id,  data  , { headers });
  }

  deleteJson(id) {
    const headers = this.getHeaders();
    return this.http.delete(this.baseURL + id, { headers });
  }
}
