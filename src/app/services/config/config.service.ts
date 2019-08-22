import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configurations: object = null;

  constructor(private http: HttpClient) { }

  getConfigs() {
    const promise = new Promise((resolve, reject) => {
      this.http.get('assets/config.json')
        .toPromise()
        .then(
          res => {
            localStorage.setItem('store', JSON.stringify(res));
            resolve();
          }
        );
    });
   }
}

export function loadConfigurations(configService: ConfigService) {
  return () => configService.getConfigs();
}
