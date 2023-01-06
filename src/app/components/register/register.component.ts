import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  clientID = environment.client_id;
  email?: string;
  name?: string;
  
  constructor(private authService: AuthService, private http: HttpClient) { }

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

  register(formData: any) {
    this.authService.register(formData);
  }
}
