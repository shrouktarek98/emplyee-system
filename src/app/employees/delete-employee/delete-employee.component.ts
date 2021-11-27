import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {
  empID: any;
  isActive: any = true;
  constructor(
    private modalService: BsModalRef,
    private employeeService: EmployeeService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  deleteEmployee(){
    this.isActive = false;
    for (let index = 0; index < this.empID.length; index++) {
      this.employeeService.deleteEmployee(this.empID[index]).subscribe((res: any)=>{
        this.isActive = true;
        this.toastrService.success('Employee Deleted Success')
        this.closeModal();
      }, err =>{
        this.isActive = true;
        this.toastrService.error('Employee Deleted Failed')
      })
      
    }
   
  }
  closeModal() {
    this.modalService.hide();
  }

}
