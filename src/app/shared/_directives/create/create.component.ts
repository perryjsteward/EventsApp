import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl,FormGroupDirective, NgForm, Validators, NgModel } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { EventService } from '../../../core/_services/event.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';


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
  public searchControl: FormControl;

  date: any;

  inputName: any;
  selectedEndTime: any;
  selectedLocation: any;

  @ViewChild("search") public searchElementRef: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, public dialog: MatDialog, private atp: AmazingTimePickerService, private eventsService: EventService) {
  }

  ngOnInit() {
    this.searchControl = new FormControl();

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

  autoComplete(){
    //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
       types: ["address"]
     });
     autocomplete.addListener("place_changed", () => {
       this.ngZone.run(() => {
         //get the place result
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

         //verify result
         if (place.geometry === undefined || place.geometry === null) {
           return;
         }
         this.selectedLocation = place;
         console.log(place.geometry.location.lng())
         console.log(place.geometry.location.lat())
       });
     });
   });
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
    // configure location
    if(this.selectedLocation) {
        form.value['formatted_address'] = this.selectedLocation.formatted_address;
        form.value['lat'] = this.selectedLocation.geometry.location.lat();
        form.value['lng'] = this.selectedLocation.geometry.location.lng();
    }
    // upload event
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
    this.autoComplete();
  }

  closeOptions(){
    this.extraOptions = false;
  }

  ngOnDestroy() {
    this.event = {};
  }

}
