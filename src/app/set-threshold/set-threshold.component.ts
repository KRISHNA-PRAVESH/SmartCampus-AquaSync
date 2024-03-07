import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-set-threshold',
  templateUrl: './set-threshold.component.html',
  styleUrls: ['./set-threshold.component.css']
})
export class SetThresholdComponent {

  ThresholdData = {
    OverHeadMin:'',
    OverHeadMax:'',
    SumpTankMin:'',
    SumpTankMax:''
  }

  constructor(private firebaseService: FirebaseService) { }

  isValid(){
    if(this.ThresholdData.OverHeadMin > this.ThresholdData.OverHeadMax) alert("OverHead Min should be lesser than OverHead Max");

    else if(this.ThresholdData.SumpTankMin > this.ThresholdData.SumpTankMax) alert("SumpTank Max should be lesser than SumpTank Max");

    else if(Number(this.ThresholdData.OverHeadMax) > 100 || Number(this.ThresholdData.SumpTankMax) > 100) alert('Maximum values should not exceed 100');

    else return true;

    return false;
  }
  Update(){
    if(this.isValid()){
      this.firebaseService.updateThreshold(this.ThresholdData);
      this.ThresholdData.OverHeadMax = '';
      this.ThresholdData.OverHeadMin = '';
      this.ThresholdData.SumpTankMin = '';
      this.ThresholdData.SumpTankMax = '';
      alert("Value Set");
    }
   
  }
}
