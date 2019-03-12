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
import {ChangeDetectorRef} from '@angular/core';

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
  extraDescription = false;
  userLocation: any;
  shareUrl: any;
  copied = false;

  locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private cd : ChangeDetectorRef, private mapsAPILoader: MapsAPILoader, private router: Router,public dialog: MatDialog, private eventService: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    if(navigator.geolocation){
      this.userLocation = true;
    } else {
      this.userLocation = false;
    }

    this.activatedRoute.queryParams.subscribe(params => {
        if(params.id && params.id != ''){
          this.getEvent(params.id);
        } else {
          this.router.navigate(['/view']);
        }

    });
  }

  locationError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // this.userLocation = false;
  }

  eventImage(){
    return 'bg-5'
  }

  likeEvent(){
    if(this.event.event_likes){
      this.event.event_likes = this.event.event_likes + 1;
    } else {
      this.event.event_likes = 1;
    }
    this.eventService.update(this.event)
        .subscribe(response => {
          console.log(response)
        })
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

  issueGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Issue - List',
      eventAction: 'EventIssue',
      eventValue: 10
    });
  }

  likeEventGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'View',
      eventLabel: 'Like - Event',
      eventAction: 'likeEvent',
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
          console.log(response);
          this.event = response.events[0];
          this.getShareContent();
          this.updateMap(this.event);
          this.cd.detectChanges();
        })


  }

  getCalendarDescription(){
    if(this.event && this.event.description){
      var old_description, new_description;
      old_description = this.event.description;

      if(old_description.length >= 140) {
        new_description = old_description.substring(0, 140) + '...';
        return new_description + "\n\n" + this.getEventUrl();
      }
      else {
        return old_description + "\n\n" + this.getEventUrl();
      }
    } else {
      return this.getEventUrl();
    }
  }

  getEventUrl(){
    return "https://" + window.location.host + '/#/view?id=' + btoa(this.event.event_id);
  }

  getStartDateTime(){
    if(this.event){
      let datetime = moment.utc(this.event.start_date + " " + this.event.start_time);
      return datetime.format()
    }
  }

  limitedDescription(data){
    if(data.length >= 140) {
      data = data.substring(0, 140) + '...';
      return data;
    }
    else {
      return data;
    }
  }

  largeDescription(data){
    if(data.length >= 140) {
      return true;
    }
    else {
      return false;
    }
  }

  getEndDateTime(){
    if(this.event){
      if(this.event.end_date && this.event.end_time){
        let datetime = moment.utc(this.event.end_date + " " + this.event.end_time);
        return datetime.format()
      }
      if(this.event.end_date && !this.event.end_time){
        let datetime = moment.utc(this.event.end_date);
        return datetime.format()
      }
      if(!this.event.end_date && this.event.end_time){
        if(this.event.end_time < this.event.start_time){
          let datetime = moment.utc(this.event.start_date + " " + this.event.end_time).add(24, 'hours');
          return datetime.format()
        } else {
          let datetime = moment.utc(this.event.start_date + " " + this.event.end_time);
          return datetime.format()
        }
      }
    }
  }



  updateMap(event){
    this.lat = parseFloat(event.lat);
    this.lng = parseFloat(event.lng);
  }

  shareAlert(){
    // alert("I've copied the URL!");
    this.copied = true;
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

  openDescription(){
    this.extraDescription = true;
  }

  closeDescription(){
    this.extraDescription = false;
  }

  navigateUser(position){
    // console.log(position)
      window.location.href = "http://maps.google.com/?saddr=" + position.coords.latitude + "," + position.coords.longitude +"&daddr=" + this.event.formatted_address;
  }

  getDirections(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.navigateUser(position)
    },this.locationError,this.locationOptions);
  }

  reportEvent(){
    var subject = encodeURI("Report Event: " + this.event.event_id)
    window.location.href = "mailto:help.eventsapp@gmail.com?Subject=" + subject;
  }

  eventIssue(){
    var subject = encodeURI("Somethings gone wrong: " + this.event.event_id)
    window.location.href = "mailto:help.eventsapp@gmail.com?Subject=" + subject;
  }

  getShareContent(){
    this.shareUrl = this.getEventUrl();

  }
}
