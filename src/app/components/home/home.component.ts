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
  addedIp: ipModel;
  addedIpIcon: string;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private ipService: IpService) { }

  ngOnInit(): void {
    this.loadIps();
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
    this.isLoading = true;
    this.ipService.createIp(this.inputip)
      .then((res: ipModel) => {
        this.addedIp = res;
        this.isLoading = false;
      });
    this.inputip = "";
  }

  delete(ipId: string) {
    this.ipService.deleteIp(ipId)
      .then((res) => {
        this.loadIps();
      });
  }

}

export interface ipModel {
  ipv4: string,
  latitude: string,
  longitude: string,
  city: string,
  region: string,
  country: string,
  pollution: object,
  weather: object,
  userId: string,
  creationDate: Date,
  modificationDate: Date,
  active: boolean,
}