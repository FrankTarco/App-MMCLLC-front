import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDashboardComponent } from './add-dashboard/add-dashboard.component';
import { MainComponent } from './client/main/main.component';

const routes: Routes = [
  {path:'app',component:AddDashboardComponent},
  {path:'',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
