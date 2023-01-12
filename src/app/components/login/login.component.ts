import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  clientID = environment.client_id;
  email?: string;
  name?: string;
  error?: string;
  
  constructor(private authService : AuthService, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.hasToken()) {
      this.authService.loginWithGoogle()
        .then((response: any) => {
          console.log(response);
          const user = response.user;
          const token = response.token;
          window.sessionStorage.setItem('userEmail', user.email);
          window.sessionStorage.setItem('userToken', token);

          this.email = user.email;
          this.name = user.name;
        })
        .catch((err) => {
          console.log(err)
        })
    }

  // Reload page to display Google Auth button
    if (!localStorage.getItem('gauth')) { 
      localStorage.setItem('gauth', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('gauth') 
    }
  }

  login(formData: any) {
    this.authService.login(formData)
    .then((response: any) => {
      console.log(response);
      const user = response.user;
      const token = response.token;
      window.sessionStorage.setItem('userEmail', user.email);
      window.sessionStorage.setItem('userToken', token);

      this.email = user.email;
      this.name = user.name;
    })
    .catch((err) => {
      console.log(err);
      this.error = err;
    });
  }

  handleCredentialResponse() {
    this.router.navigate(['/']);
    //  TO FIX
  }
}
