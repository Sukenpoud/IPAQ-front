import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class IpService {
    constructor(private http: HttpClient) {
    }

    getIps() {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3001/api/ip', {
                headers: {
                    email: window.sessionStorage.getItem('userEmail'),
                    authorization: window.sessionStorage.getItem('userToken')
                }
            }).subscribe((ips) => {
                resolve(ips); // ips présent dans le .then qui suit l'appel de la méthode getIps() 
            }, (err) => {
                console.log(err);
                reject(); // ips présent dans le .catch qui suit l'appel de la méthode getIps() 
            })
        })
    }
}