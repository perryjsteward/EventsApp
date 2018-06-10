import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../shared/_directives/share/share.component';
import { EventService } from '../core/_services/event.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import * as ICS from 'ics-js';
import { saveAs } from 'file-saver/FileSaver';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: any;
  center = {};
  lat: number;
  lng: number;
  zoom: number = 10;
  disclaimerFlag = false;
  userLocation: any;

  constructor(private mapsAPILoader: MapsAPILoader, private router: Router,public dialog: MatDialog, private eventService: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      };


    this.activatedRoute.queryParams.subscribe(params => {
        if(params.id && params.id != ''){
          this.getEvent(params.id);
        } else {
          this.router.navigate(['/view']);
        }

    });
  }

  setPosition(position){
      this.userLocation = position.coords;
  }


  shareGlobalGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Share - Global',
      eventAction: 'ShareEvent',
      eventValue: 10
    });
  }

  saveEventGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Save - ics',
      eventAction: 'SaveEvent',
      eventValue: 10
    });
  }

  shareListGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Share - List',
      eventAction: 'ShareEvent',
      eventValue: 10
    });
  }

  reportGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Report - List',
      eventAction: 'ReportEvent',
      eventValue: 10
    });
  }

  getDirectionsGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Google Directions - List',
      eventAction: 'GetGoogleDirectionsEvent',
      eventValue: 10
    });
  }

  timeUntil(start_date){
      return moment(start_date).fromNow();
  }

  prettifyDate(date) {
    return moment(date).format("D MMM").toUpperCase()
  }

  clicked() {
    console.log("clicked that guy")
  }

  getEvent(id: any){
    this.eventService.getById(atob(String(id)))
        .subscribe(response => {
          console.log(response)
          this.event = response.events[0];
          this.updateMap(this.event);
        })
  }

  saveEvent(){
    console.log(this.event)
    const cal = new ICS.VCALENDAR();
    const event = new ICS.VEVENT();

    var description;
    if(this.event.description.length >= 70) {
      description = this.event.description.substring(0, 70) + '...';
    }

    // cal.addProp('VERSION', 2) // Number(2) is converted to '2.0'
    // cal.addProp('PRODID', 'XYZ Corp');
    // cal.addProp('DTSTART', this.event.start_date);

    // event.addProp('UID', this.event.event_id);
    // event.addProp('DTSTAMP', moment.utc(this.event.start_date).format(),{ VALUE: 'DATE-TIME' };
    // event.addProp('DTSTART', moment(this.event.start_date).toDate());
    // event.addProp('DTEND', moment(this.event.end_date).toDate());
    // event.addProp('DESCRIPTION', escape(description));
    // event.addProp('SUMMARY', escape(this.event.name));
    // event.addProp('LOCATION', escape(this.event.formatted_address.replace(",","")));
    // event.addProp('URL', window.location.host + '/view?id=' + btoa(this.event.event_id));

    cal.addComponent(event);

    var iCalendarData = [
        'BEGIN:VCALENDAR',
        'CALSCALE:GREGORIAN',
        'PRODID:-//Example Inc.//Example Calendar//EN',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'DTSTAMP:20080205T191224Z',
        'DTSTART:20081006',
        'SUMMARY:Planning meeting',
        'UID:4088E990AD89CB3DBB484909',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join("\r\n");

    // let file = new Blob([iCalendarData], { type: 'text/calendar;charset=utf-8' });
    // saveAs(file, 'helloworld.ics')
    // window.open("data:text/calendar; base64," + btoa(cal.toString()));
    window.location.href = "data:text/calendar; base64," + btoa(iCalendarData);
  }


  updateMap(event){
    this.lat = parseFloat(event.lat);
    this.lng = parseFloat(event.lng);
  }


  openShareDialog(): void {
    let dialogRef = this.dialog.open(ShareComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      autoFocus: false,
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDisclaimer(){
    this.disclaimerFlag = true;
  }

  closeDisclaimer(){
    this.disclaimerFlag = false;
  }

  getDirections(){
    window.location.href = "http://maps.google.com/?saddr=" + this.userLocation.latitude + "," + this.userLocation.longitude +"&daddr=" + this.event.formatted_address;
  }

  reportEvent(){
    var subject = encodeURI("Report Event: " + this.event.event_id)
    window.location.href = "mailto:help.eventsapp@gmail.com?Subject=" + subject;
  }
}
