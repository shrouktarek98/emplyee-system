import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, last, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public base = 'http://task.soft-zone.net/api/';
  constructor(private http: HttpClient,
     private router: Router,private toastrService:ToastrService) { }
  // Api Get
  getData<T>(
    apiRoute: string,
    urlParams: any = {},
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http
      .get<T>(this.base + apiRoute, {
        headers,
        params: urlParams,
        withCredentials: withToken, // withCred makes sure Authorization headers are sent as well
      })
      .pipe(
        take(1),
        catchError((err) => {          
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
            }
        }

          return throwError(err);
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }


   progressCount = new BehaviorSubject<number>(0);
  // Api Post
  postData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
   // headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang)
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    const req = new HttpRequest('POST', this.base + apiRoute, data, {
      headers,
      withCredentials: withToken,
    });
    
      return this.http.request<any>(req).pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event;
          }
          return null;
        }),
        last(),
        map((res:any) => {
          if(!res){
            
            return false
          } else{
            
            return {
              status: res,
              ...res.body,
            };
          }
          
          
        }),
        catchError((err) => {
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
              if (!obj.hasOwnProperty(prop)) continue;
            }
        }
          return throwError({
            error:err.error
          });
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }


  
}
