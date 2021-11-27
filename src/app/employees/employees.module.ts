import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AngularPaginatorModule } from 'angular-paginator';
import { NgxPaginationModule } from 'ngx-pagination';



import {MatSortModule} from '@angular/material/sort';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AngularPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSortModule,
    NgxUiLoaderModule, 
    NgxUiLoaderHttpModule,
  ]
})
export class EmployeesModule { }
