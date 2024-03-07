import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MessageService } from './message.service';
import { ReportService } from './report.service';

import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  loggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth,private router:Router,private db:AngularFireDatabase,private messageService:MessageService,
   private reportService:ReportService) { }

  async signIn(email: string, password: string){

    await this.firebaseAuth.signInWithEmailAndPassword(email,password) 
    .then((res) =>{
      // console.log(res);
      this.loggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user));
      this.router.navigate(['dashboard'])
    })
    .catch((err) =>{
      console.log("Error"+err.message);
      alert(err.message);
      this.router.navigate(['login'])
    })
  }

  isLoggedIn(){
    let user = localStorage.getItem('user');
    if(user) return true;
    else return false;
  }
  async insert(userId:string,name:string,email:string,imageUrl:string){
    const data = {
      userId,name,email,imageUrl
    }
    const ref = this.db.list('/messages');
    return ref.push(data);

  }
  private async fetchData(){
  
    const ref = this.db.list('/watermanagement');
    // console.log(ref.valueChanges());
    return ref.valueChanges();
  }



   readings:any[] = []
   latest_id = -1;
    c = 0;
  async readData(){
    await new Promise(async(resolve,reject)=>{
      (await this.fetchData()).subscribe((data)=>{
        // this.reportService.storeMysql(data.slice(-20));
        console.log(data.slice(-20));
        let clean_data: any[] = []
        data.forEach((reading:any)=>{
          // console.log(reading);
          const data = reading.data.split('#');
         
          const structured_json = {
              count: data[0],
              oh_water_level: data[1],
              sump_motor_status: data[2],
              sump_water_level: data[3],
              sump_motor_power:data[4],
              sump_motor_current:data[5],
              sump_motor_voltage:data[6],
              sump_motor_pf:data[7],
              borewell_motor_status: data[8],
              borewell_motor_power: data[9],
              borewell_motor_current: data[10],
              borewell_motor_voltage: data[11],
              borewell_motor_pf: data[12]
          };
          
          clean_data.push(structured_json);
        })
        this.readings = clean_data
        // console.log("inside read data method");
        // console.log(this.readings);
       
        resolve(data);
      });
    });
    return this.readings;
  }



   getUpdatedReadings(){
     
    return this.readings;
  }

  ThresholdData = {
    OverHeadMin:'',
    OverHeadMax:'',
    SumpTankMin:'',
    SumpTankMax:''
  }


  updateThreshold(ThresholdData:any){

    // console.log(ThresholdData)
    this.ThresholdData.OverHeadMax = ThresholdData.OverHeadMax;
    this.ThresholdData.OverHeadMin = ThresholdData.OverHeadMin;
    this.ThresholdData.SumpTankMin = ThresholdData.SumpTankMin;
    this.ThresholdData.SumpTankMax = ThresholdData.SumpTankMax;
    const ref = this.db.list('/transmit');
    ref.push(ThresholdData);
    console.log("Pushed");
    
  }

  getThresholdData(){
    return this.ThresholdData;
  }

  


  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
}
