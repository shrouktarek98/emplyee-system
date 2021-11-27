import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent ,
   children:[
    // {path:'add-employee' , component:LoginComponent},
    // { path: '', redirectTo: 'employee', pathMatch: 'full' },
    // { path: '**', redirectTo: 'employee', pathMatch: 'full' },
   ] 
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
