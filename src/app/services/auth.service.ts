import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private $token: string = '';

    constructor(private http: HttpClient) {
        this.$token = window.sessionStorage.getItem('g_token') || '';
        console.log(this.$token);
    }

    hasToken() {
        return this.$token != '';
    }

    loginWithGoogle() {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3001/api/auth/login', {token: this.$token})
                .subscribe((user: any) => {
                    console.log(user);
                    resolve(user);
                }, (err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }

}