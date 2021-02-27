import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AnalysisListComponent } from './component/analysis-list/analysis-list.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DailyDataComponent } from './component/daily-data/daily-data.component';
import { HomeComponent } from './component/home/home/home.component';


const routes: Routes = [  
  {path : 'analysis-list', component : AnalysisListComponent},
  {path : 'daily-data', component : DailyDataComponent},
  {path : 'login', component: LoginComponent},
  {path : 'profile', component: ProfileComponent},
  {path : 'home', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
