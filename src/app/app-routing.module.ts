import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'employee', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
    // canActivate: [ Guard ],
    // data: { permission: 'employess' }
  },
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: '**', redirectTo: 'employee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabled',
    scrollPositionRestoration:'enabled',
    useHash:true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
