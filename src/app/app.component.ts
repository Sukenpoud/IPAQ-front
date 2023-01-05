import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { IpService } from './services/ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-ipaq';
  clientID = environment.client_id;

  email?: string;
  name?: string;
  ips?: any;

  constructor(private authService: AuthService, private ipService: IpService) {

  }

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
  }

  logout() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  loadIps() {
    this.ipService.getIps().then((ipList: any) => {
      this.ips = ipList;
    }).catch((err) => {
      console.log(err)
    })
  }
}
