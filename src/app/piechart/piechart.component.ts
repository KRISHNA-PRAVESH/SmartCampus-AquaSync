import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public pie_chart:any;

  public water_level:number = 0;
  
  constructor(private firebaseService:FirebaseService) {}
  
  public readings:any[] = [];
   fetchable:boolean = false;
   async ngOnInit() {
  //use setTime out for some time until graph component fetches all data
   
      this.readings =  await this.firebaseService.readData();
      // console.log("Insde pichart component");
      // console.log(this.readings);
      this.fetchable = true;
      let len = this.readings.length-1;
      this.water_level = this.readings[len].sump_water_level;
      this.displayPieChart(this.water_level);
  
  

  
   setInterval(()=>{
    this.readings =  this.firebaseService.getUpdatedReadings();
    let len = this.readings.length-1;
    let current_water_level = parseInt(this.readings[len].sump_water_level);
    this.water_level = this.readings[len].sump_water_level;
    this.pie_chart.data.datasets[0].data = [current_water_level,100-current_water_level];

      this.pie_chart.update();
   },3000)

  }
  displayPieChart(data:number){
    //  console.log(this.firebaseService.getUpdatedReadings())
   this.pie_chart = new Chart("pie_chart",{
    type:'pie',
    data:{
      labels:['Water Level'],
    datasets: [{
      data: [data,100-data],
      backgroundColor: [
        '#96EFFF',
        'grey'
      ],
     
    }]
   }
   })

  }

}
