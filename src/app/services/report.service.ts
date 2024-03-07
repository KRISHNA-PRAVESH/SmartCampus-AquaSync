import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

   storeMysqli(body:any){
    this.http.post('http://localhost:5210/waterlevel/data',body).subscribe({
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("uploaded into mysql")
        
      }
    })
  }
}
