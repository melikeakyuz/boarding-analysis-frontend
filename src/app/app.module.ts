import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { AnalysisService } from './services/analysis.service';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';
import { AnalysisListComponent } from './component/analysis-list/analysis-list.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { DailyDataComponent } from './component/daily-data/daily-data.component';
import { HomeComponent } from './component/home/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AnalysisListComponent,
    LoginComponent,
    ProfileComponent,
    DailyDataComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [AnalysisService, AuthenticationService, TokenStorageService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }