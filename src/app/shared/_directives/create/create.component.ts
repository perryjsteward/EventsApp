import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgForm, NgModel } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';

import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  disclaimer: any;
  disclaimerFlag = false;
  extraOptions = false;
  event: any;

  inputName: any;
  selectedEndTime: any;

  constructor(public dialog: MatDialog, private atp: AmazingTimePickerService) {
  }

  ngOnInit() {
    this.event = {
      "name": '',
      "description" : '',
      "location": '',
      "start_date": '',
      "end_date": '',
      "start_time": '',
      "end_time": '',
      "all_day": ''
    }
    var inputs = document.querySelectorAll('input');
     for(var i=0; i < inputs.length; i++) {
      inputs[i].blur();
     }
  }

  openTime(selectedTime) {
      const amazingTimePicker = this.atp.open({
          time:  this.event[selectedTime],
          arrowStyle: {
              background: '#40D5C0',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.event[selectedTime] = time;
      });
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  openDisclaimer(){
    this.disclaimerFlag = true;
  }

  closeDisclaimer(){
    this.disclaimerFlag = false;
  }

  openOptions(){
    this.extraOptions = true;
  }

  closeOptions(){
    this.extraOptions = false;
  }

  ngOnDestroy() {
    this.event = {};
  }

}
