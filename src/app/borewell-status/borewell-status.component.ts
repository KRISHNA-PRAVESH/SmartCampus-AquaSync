import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-borewell-status',
  templateUrl: './borewell-status.component.html',
  styleUrls: ['./borewell-status.component.css']
})
export class BorewellStatusComponent {
  constructor(private firebaseService: FirebaseService){}
  public readings:any = {}
  ngOnInit() {

    setInterval(()=>{
      this.readings = this.firebaseService.getUpdatedReadings();
      // console.log("insdie borewell compo");
      // console.log(this.readings);
      let len = this.readings.length;
      //slicing the latest 10 readings
      this.readings = this.readings[len-1];

    },4000)

  }
}
