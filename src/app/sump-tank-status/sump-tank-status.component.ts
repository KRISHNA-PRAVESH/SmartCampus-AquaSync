import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-sump-tank-status',
  templateUrl: './sump-tank-status.component.html',
  styleUrls: ['./sump-tank-status.component.css']
})
export class SumpTankStatusComponent {
  constructor(private firebaseService: FirebaseService){}
  public readings:any = {}
  ngOnInit() {

    setInterval(()=>{
      this.readings = this.firebaseService.getUpdatedReadings();
      let len = this.readings.length;
      //slicing the latest 10 readings
      this.readings = this.readings[len-1];

    },4000)

  }
}
