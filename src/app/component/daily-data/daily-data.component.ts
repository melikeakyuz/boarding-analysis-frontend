import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-daily-data',
  templateUrl: './daily-data.component.html',
  styleUrls: ['./daily-data.component.scss']
})
export class DailyDataComponent implements OnInit {
  getAllData: any;
  allData: any;
  dailyDateData: any; 
  dailyBusData: any;
  dailyDriverData: any;
  dailyRouteData: any;
  dateData: any;
  busData: any;
  driverData: any;
  routeData: any;
  currentUserToken: any;
  message: any;
  constructor(private token: TokenStorageService,private dataService: DataService ) { }
  ngOnInit(): void {
    this.currentUserToken = this.token.getToken();
    this.getDailyData();
    this.getDailyBusData();
    this.getDailyDriverData();
    this.getDailyRouteData();
  }
  getDailyData(): void {
    this.dataService.getDailyDate(this.currentUserToken)
      .subscribe(
        data => {
          this.dailyDateData = JSON.stringify(data.data);
          this.dateData = JSON.parse(this.dailyDateData);
        },
        err => {
          this.dailyDateData = JSON.parse(err.error).message;
        });
  };
  getDailyBusData(): void {
    this.dataService.getDailyBus(this.currentUserToken)
      .subscribe(
        data => {
          this.dailyBusData = JSON.stringify(data.data);
          this.busData = JSON.parse(this.dailyBusData);
        },
        err => {
          this.dailyBusData = JSON.parse(err.error).message;
        });
  };
  getDailyDriverData(): void {
    this.dataService.getDailyDriver(this.currentUserToken)
      .subscribe(
        data => {
          this.dailyDriverData = JSON.stringify(data.data);
          this.driverData = JSON.parse(this.dailyDriverData);
        },
        err => {
          this.dailyDriverData = JSON.parse(err.error).message;
        });
  };
  getDailyRouteData(): void {
    this.dataService.getDailyRoute(this.currentUserToken)
      .subscribe(
        data => {
          this.dailyRouteData = JSON.stringify(data.data);
          this.routeData = JSON.parse(this.dailyRouteData);
        },
        err => {
          this.dailyRouteData = JSON.parse(err.error).message;
        });
  };
  refresh() {
    this.dataService.refreshPage(this.currentUserToken)
    .subscribe(    
      data => {
      this.message = data.message;
    },
    err => {
      this.message = JSON.parse(err.error).message;
    });
    this.dataService.getRefreshData(this.currentUserToken)
      .subscribe(
          data => {
        this.getAllData = JSON.stringify(data.data);
        this.allData = JSON.parse(this.getAllData);
        this.reloadPage();
      },
      err => {
        this.getAllData = JSON.parse(err.error).message;
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
 
  
  

}
