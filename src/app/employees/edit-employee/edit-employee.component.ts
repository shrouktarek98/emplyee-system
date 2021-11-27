import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  empID: any = null;
  isActive: any = true;
  editEmployeeForm!:FormGroup;
  constructor(
    private modalService: BsModalRef,
    private formBuilder:FormBuilder,
    private employeeService: EmployeeService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.editEmployeeForm = this.formBuilder.group({
      empId :[this.empID,[Validators.required]],
      empName :['',[Validators.required]],
      empEmail :['',[Validators.required, Validators.email]],
      empAddress :['',Validators.required],
      empPhone :['',[Validators.required]],
    });
    this.getEmployee();
  }
  get editEmployeeFormRef(){ return this.editEmployeeForm.controls }
  editEmployee(){
    this.isActive = false;
    this.employeeService.editEmployee(this.editEmployeeForm.value).subscribe((res: any) => {
      this.isActive = true;
      
      this.toastrService.success('Employee Edit Success')
      this.closeModal();
    }, err => {
      this.isActive = true;
      this.toastrService.error('Employee Edit Failed')
    })
  }
  getEmployee(){
    this.employeeService.getEmployee(this.empID).subscribe((res: any) => {
      this.editEmployeeForm.get('empName')?.setValue(res.empName);
      this.editEmployeeForm.get('empEmail')?.setValue(res.empEmail);
      this.editEmployeeForm.get('empAddress')?.setValue(res.empAddress);
      this.editEmployeeForm.get('empPhone')?.setValue(res.empPhone);
      this.isActive = true;
    })
  }
  closeModal() {
    this.modalService.hide();
  }

}
