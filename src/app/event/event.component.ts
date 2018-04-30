import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../shared/_directives/share/share.component';
import { EventService } from '../core/_services/event.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

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


  constructor(private mapsAPILoader: MapsAPILoader, private router: Router,public dialog: MatDialog, private eventService: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        if(params.id && params.id != ''){
          this.getEvent(params.id);
        } else {
          this.router.navigate(['/view']);
        }

    });
  }

  shareGlobalGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Share - Global',
      eventAction: 'ShareEvent',
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
    window.location.href = "http://maps.google.com/?saddr=location&daddr=" + this.event.formatted_address;
  }

  reportEvent(){
    var subject = encodeURI("Report Event: " + this.event.event_id)
    window.location.href = "mailto:help.eventsapp@gmail.com?Subject=" + subject;
  }
}
