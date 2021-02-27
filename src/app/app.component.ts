import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'binis-analiz';

  isLoggedIn = false;
  username: string;
  isAnalysislist = false;
  isDailyData = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  goAnalysisListPage() {
    this.isAnalysislist = true;
    this.isDailyData = false;
  }
  goDailyDataPage() {
    this.isDailyData = true;
    this.isAnalysislist = false;
  }
}