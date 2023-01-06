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

    isLogged() {
        if ( this.hasToken() || window.sessionStorage.getItem('userToken') ) {
            return true;
        } else {
            return false;
        }
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
    
    login(formData: any) {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3001/api/auth/login', formData)
                .subscribe((res) => {
                    console.log('Enregistrement réussi !');
                    resolve(res);
                }, (err) => {
                    console.error('Erreur lors de l\'enregistrement : ', err);
                    reject(err);
                })
        })
        // console.log(formData);
    }

    register(formData: any) {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3001/api/auth/signup', formData)
                .subscribe((res) => {
                    console.log('Enregistrement réussi !');
                    resolve(res);
                }, (err) => {
                    console.error('Erreur lors de l\'enregistrement : ', err);
                    reject(err);
                })
        })
        // console.log(formData);
    }

    logout() {
        window.sessionStorage.clear();
        window.location.reload();
      }
}