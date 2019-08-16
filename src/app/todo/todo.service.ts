import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

export interface JSONData {
  todo: JSONData;
  id: number;
  title: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<JSONData>('http://localhost:5000/todo/');
  }


  config(methodStr, id = '', data) {
    let options = {
      method: methodStr ,
      headers: {
        'Content-Type': 'application/json'
      },
        body: ((methodStr === 'DELETE') ? null : JSON.stringify(data) )
    };
    const result = from(fetch('http://localhost:5000/todo/' + id, options));
    return result.subscribe((response) => response.json);

  }

  add(data) {
    const method = 'POST';
    const add = this.config(method, '', data);
  }

  update(data, id) {
    const method = 'PUT';
    this.config(method, id, data);
  }

  delete(id) {
    const method = 'DELETE';
    this.config(method, id, null);
  }
}
