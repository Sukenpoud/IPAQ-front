import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ips?: any;
  inputip: string = '';

  constructor(private authService: AuthService, private ipService: IpService) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
  }

  loadIps() {
    this.ipService.getIps().then((ipList: any) => {
      this.ips = ipList;
    }).catch((err) => {
      console.log("ERROR : Utilisateur non connecté");
    })
  }

  onSubmit() {
    console.log(this.inputip);
    this.ipService.createIp(this.inputip);
  }

}
