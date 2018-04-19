import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl,FormGroupDirective, NgForm, Validators, NgModel } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { EventService } from '../../../core/_services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit {

  disclaimer: any;
  disclaimerFlag = false;
  extraOptions = false;
  event: any;

  date: any;

  inputName: any;
  selectedEndTime: any;


  constructor(private router: Router, public dialog: MatDialog, private atp: AmazingTimePickerService, private eventsService: EventService) {
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

  validForm() {
    if(this.event.name && this.event.start_date && this.event.start_time){
      return true;
    } else {
      return false;
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
    this.eventsService.create(form.value)
        .subscribe(response => {
           if(response.event_id){
             console.log(btoa(response.event_id))
             this.router.navigate(['/view'],{ queryParams: { id: btoa(response.event_id) } });
             this.dialog.closeAll();
           }
        });
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
