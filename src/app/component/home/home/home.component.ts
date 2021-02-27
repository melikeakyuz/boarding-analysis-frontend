import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AnalysisService } from 'src/app/services/analysis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUserToken: any;
  retrievedAnalyzes: any;
  analyzes: any;
  sortedDates = [];
  totalAmount: any; 
  percent: any;
  percents = [];
  doughnotChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Doughnut Chart",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    }
    
  };
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  constructor(private tokenStorageService: TokenStorageService, private analysisService: AnalysisService) { }

  ngOnInit(): void {
    this.currentUserToken = this.tokenStorageService.getToken();
    this.retrieveAnalyzes();
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
            this.doughnutChartLabels.push(this.sortedDates.pop());
          }
          this.totalAmount=amounts[0];
          for(var i = 1; i < amounts.length; i++) {
            this.totalAmount+=amounts[i];
          }
          for(var i = 0; i < amounts.length; i++) {
            this.percent= ((amounts[i]*100)/this.totalAmount).toFixed(2);
            this.percents.push(this.percent);
          }
          this.doughnutChartData = [this.percents.reverse()];
        },
        err => {
          this.analyzes = JSON.parse(err.error).message;
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
