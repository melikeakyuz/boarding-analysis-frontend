import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  };
  barChartLabels: Label[] = []; //days
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [], label: "" },]; //amounts
  amounts: any[];
  retrievedAnalyzes: any;
  retrievedBus: any;
  retrievedDay: any;
  retrievedDriver: any;
  retrievedRoute: any;
  analyzes: any;
  bus: any;
  day: any;
  driver: any;
  route: any;
  startDate = "2020-07-01";
  endDate = "2020-08-31";
  deneme: any;
  currentUserToken: any;
  sortedDates = [];

  constructor(private token: TokenStorageService,private analysisService: AnalysisService ) { }

  ngOnInit(): void {
    this.currentUserToken = this.token.getToken();
    this.retrieveAnalyzes();
    this.retrieveTheMostUsedBus();
    this.retrieveTheMostUsedDay();
    this.retrieveTheMostUsedDriver();
    this.retrieveTheMostUsedRoute();

  }
 
  retrieveAnalyzes(): void {
    this.analysisService.getAll(this.currentUserToken)
      .subscribe(
        data => {
          this.analyzes = JSON.stringify(data.data);
          this.retrievedAnalyzes = JSON.parse(this.analyzes);
          var dates = [], amounts = [];
          for (var i = 0; i < this.retrievedAnalyzes.length; i++) {
            dates.push(this.retrievedAnalyzes[i].date);
          }
          this.sortedDates= this.sortDate(dates); //call function to sort dates
          var len = this.sortedDates.length;
          var total = 0;
          for (var i = 0; i < len; i++) {
            for (var j = 0; j < this.retrievedAnalyzes.length; j++) {
              if (this.sortedDates[i] === this.retrievedAnalyzes[j].date) {
                total = total + this.retrievedAnalyzes[j].total_usage_amount;
              }
            }
            amounts.push(total);
            total = 0;
          }
          for (var i = 0; i < len; i++) {
            this.barChartLabels.push(this.sortedDates.pop());
          }
          this.barChartData = [{ data: amounts.reverse(), label: "Analysis daily" },];

        },
        err => {
          this.analyzes = JSON.parse(err.error).message;
        });
  }
  retrieveTheMostUsedBus(): void {
    this.analysisService.getBus(this.currentUserToken).subscribe(
      data => {
        this.bus = JSON.stringify(data.data);
        this.retrievedBus = JSON.parse(this.bus);

      },
      err => {
        this.bus = JSON.parse(err.error).message;
      });

  }
  retrieveTheMostUsedDay(): void {
    this.analysisService.getDay(this.currentUserToken).subscribe(
      data => {
        this.day = JSON.stringify(data.data);
        this.retrievedDay = JSON.parse(this.day);

      },
      err => {
        this.day = JSON.parse(err.error).message;
      });
  }
  retrieveTheMostUsedDriver(): void {
    this.analysisService.getDriver(this.currentUserToken).subscribe(
      data => {
        this.driver = JSON.stringify(data.data);
        this.retrievedDriver = JSON.parse(this.driver);

      },
      err => {
        this.driver = JSON.parse(err.error).message;
      });
  }
  retrieveTheMostUsedRoute(): void {
    this.analysisService.getRoute(this.currentUserToken).subscribe(
      data => {
        this.route = JSON.stringify(data.data);
        this.retrievedRoute = JSON.parse(this.route);

      },
      err => {
        this.route = JSON.parse(err.error).message;
      });
  }
  sortDate(dates) {
    var maxDate = "", index = -1;
    for (var i = 0; i < dates.length; i++) {
      for (var j = 0; j < dates.length; j++) {
        if (dates[j] != null && dates[j] > maxDate) {
          maxDate = dates[j];
          index = j;
        }
      }
      if (index != -1) {
        dates[index] = null;
        index = -1;
      }
      if (!this.sortedDates.includes(maxDate))
        this.sortedDates.push(maxDate);
      maxDate = "";
    }
    return this.sortedDates;

  }

}
