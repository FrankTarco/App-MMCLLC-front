import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDashboardComponent } from './add-dashboard/add-dashboard.component';
import { MainComponent } from './client/main/main.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddSliderComponent } from './components/add-slider/add-slider.component';
import { AddComparativeComponent } from './components/add-comparative/add-comparative.component';
import { AddInfoComponent } from './components/add-info/add-info.component';

const routes: Routes = [
  {path:'app',component:AddDashboardComponent},
  {path:'cliente',component:MainComponent},
  {path:'',component:MainPageComponent},
  {path:'prueba',component:AddInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
