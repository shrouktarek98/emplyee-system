import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  isActive: any = true;
  addEmployeeForm!:FormGroup;
  constructor(
    private modalService: BsModalRef,
    private formBuilder:FormBuilder,
    private employeeService: EmployeeService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      empName :['',[Validators.required,Validators.minLength(3)]],
      empEmail :['',[Validators.required, Validators.email]],
      empAddress :['',Validators.required],
      empPhone :['',[Validators.required]],
    });
  }
  get addEmployeeFormRef(){ return this.addEmployeeForm.controls }
  addEmployee(){
    this.isActive = false;
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe((res: any) => {
      this.isActive = true;
      this.toastrService.success('Employee Added Success')
      this.closeModal();
    }, err => {
      this.toastrService.error('Employee Added Failed')
      this.isActive = true;
    })
  }
  closeModal() {
    this.modalService.hide();
  }

}
