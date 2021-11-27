import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any = null;
  currentPage: any =1;
  modal: BsModalRef = new BsModalRef();
  



  constructor(private employeeServices: EmployeeService, private modalService: BsModalService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getEmployee();
    
  }
  getEmployee(){
    this.ngxService.startLoader("tableID");
    this.employeeServices.getEmployees().subscribe((res: any)=>{
      this.employees = res;
      this.ngxService.stopLoader("tableID");
    })
  }
  sortData(event: Sort){
    this.employees = this.employees.sort((a: any, b: any) => 0 - (a.name > b.name ? -1 : 1));
    this.employees = this.employees.sort((a: any, b: any) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc); 
        case 'address':
          return this.compare(a.address, b.address, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    isAsc ? 0 - (a < b ? -1 : 1) : 0 - (a > b ? -1 : 1)
  }
  selectEmployee(event: any){
    if(event){
      for (let index = 0; index < this.employees.length; index++) {
        this.employees[index].checked= true;
      }
    } else {
      for (let index = 0; index < this.employees.length; index++) {
        this.employees[index].checked= false;
      }
    }
  }
  openModalAddEmployee() {
    this.modal = this.modalService.show(AddEmployeeComponent,
    {backdrop: true , ignoreBackdropClick: true,  });
    this.modal.content.onClose.subscribe((result: any) => {
      if(result == 'apply'){
        this.getEmployee();
      }
    });
  }
  openModalEditEmployee(empID: number) {
    const initialState = { empID:empID };
    this.modal = this.modalService.show(EditEmployeeComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modal.content.onClose.subscribe((result: any) => {
      if(result == 'apply'){
        this.getEmployee();
      }
      
    });
  }
  openModalDeleteEmployee(empID: any = null ){
    let employeesID = [];
    
    if(empID){
      employeesID.push(empID) ;
    } else{
      for (let index = 0; index < this.employees.length; index++) {  
        this.employees[index].checked ? employeesID.push(this.employees[index].empId) : null;
      }
    }
    if(employeesID.length > 0){
      let initialState = {empID : employeesID}  
      this.modal = this.modalService.show(DeleteEmployeeComponent,
      {backdrop: true , ignoreBackdropClick: true, initialState });
      this.modal.content.onClose.subscribe((result: any) => {
        if(result == 'apply'){
          this.getEmployee();
        }
      });
    }
     
   
  }
  showDelete(){
    let employeesID = [];
    for (let index = 0; index < this.employees.length; index++) {  
      this.employees[index].checked ? employeesID.push(this.employees[index].empId) : null;
    }
    if(employeesID.length > 0) {
      return false
    }  else {
      return true;
    } 
  }
  
}