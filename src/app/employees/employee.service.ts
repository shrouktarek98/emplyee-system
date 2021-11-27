import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../core/http/api-service.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl= 'http://task.soft-zone.net/api/';

  constructor(private api: ApiService) { }
  getEmployees(){
    return this.api.getData<any>('Employees/getAllEmployees').pipe(
      map(data => data)
    );
  }
  addEmployee(employee: any){
    return this.api.postData<any>('Employees/addEmployee', employee).pipe(
      map(data => data)
    );
  }
  editEmployee(employee: any){
    return this.api.postData<any>('Employees/editEmployee', employee).pipe(
      map(data => data)
    );
  }
  deleteEmployee(empId: any){
    return this.api.getData<any>('Employees/deleteEmpByID/' + empId ).pipe(
      map(data => data)
    );
  }
  getEmployee(empId: any){
    return this.api.getData<any>('Employees/getEmpByID/' + empId,{} ).pipe(
      map(data => data)
    );
  }
}
