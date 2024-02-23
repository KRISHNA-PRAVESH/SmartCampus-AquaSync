
import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-piechart-overhead',
  templateUrl: './piechart-overhead.component.html',
  styleUrls: ['./piechart-overhead.component.css']
})
export class PiechartOverheadComponent {
  public pie_chart:any;

  public water_level:any = 50;
  
  constructor(private firebaseService:FirebaseService) {}
  
  public readings:any[] = [];
   fetchable:boolean = false;
   async ngOnInit() {
  //use setTime out for some time until graph component fetches all data
   
      this.readings =  await this.firebaseService.readData();
      console.log(this.readings);
      this.fetchable = true;
      let len = this.readings.length-1;
      let pie_data = [this.readings[len].co,this.readings[len].h2s,this.readings[len].nh3,this.readings[len].ch4]
      this.displayPieChart(pie_data);
  
  

  
   setInterval(()=>{
    this.readings = this.firebaseService.getUpdatedReadings();
     let co_readings = this.readings.map(item => item.co);
      let h2s_readings = this.readings.map(item => item.h2s);
      let nh3_readings = this.readings.map(item => item.nh3);
      let ch4_readings = this.readings.map(item => item.ch4);
      
      
      const len = co_readings.length-1;
      let pie_data = [co_readings[len],h2s_readings[len],nh3_readings[len],ch4_readings[len]]
      // this.pie_chart.data.datasets[0].data = pie_data;
      this.pie_chart.update();
   },3000)

  }
  displayPieChart(data:any[]){
    //  console.log(this.firebaseService.getUpdatedReadings())
   this.pie_chart = new Chart("pie_chart_2",{
    type:'pie',
    data:{
      labels:['Water Level'],
    datasets: [{
      data: [this.water_level,100-this.water_level],
      backgroundColor: [
        '#96EFFF',
        'grey'
      ],
      hoverOffset: 4
    }]
   }
   })

  }
}
