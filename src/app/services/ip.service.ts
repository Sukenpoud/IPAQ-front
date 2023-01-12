import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class IpService {
    constructor(private http: HttpClient) {
    }
    
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'authorization': window.sessionStorage.getItem('userToken'),
          'email': window.sessionStorage.getItem('userEmail')
        })
      };

    createIp(ip: string) {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3001/api/ip/create', {
                ip: ip
            }, this.httpOptions)
            .subscribe(res => {
                console.log(res);
                resolve(res);
            }), (err) => {
                console.log(err);
            }
        })
    }

    getIps() {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3001/api/ip', {
                headers: {
                    email: window.sessionStorage.getItem('userEmail'),
                    authorization: window.sessionStorage.getItem('userToken')
                }
            }).subscribe((ips) => {
                resolve(ips);
            }, (err) => {
                reject();
            })
        })
    }

    deleteIp(ipId: string) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3001/api/ip/'+ipId , this.httpOptions)
            .subscribe(res => {
                console.log(res);
                resolve(res);
            }), (err) => {
                console.log(err);
                reject(err);
            }
        });
    }
}