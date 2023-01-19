import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private soapClient: Client;
  ips?: any;
  inputip: string = '';
  addedIp: ipModel;
  addedIpIcon: string;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private ipService: IpService, private soap: NgxSoapService) {
    // CREATE SOAP CLIENT -> NOT WORKING
    // this.soap.createClient('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL')
    //   .then(client => {
    //     this.soapClient = client;
    //   });
  }

  ngOnInit(): void {
    this.loadIps();
    // this.getCountryByCode('FR');
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

  // API SOAP TRY CALL
  public getCountryByCode(code: string): void {
    this.soapClient.call('CountryName', {sCountryISOCode: code}).subscribe(
      (res: ISoapMethodResponse) => {
        console.log(res.result.CountryNameResult);
      },
      error => {
        console.log('Error: ', error);
      }
    );
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