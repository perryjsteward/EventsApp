import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl,FormGroupDirective, NgForm, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})

export class ShareComponent implements OnInit {

  sharedMessage = encodeURI("Hey there good looking,\n\nI've just made an EventsApp event and want you to come along.\n\nCheck it out: ");
  shareUrl: any;

  messageBody: any;


  constructor(public router: Router, public dialogRef: MatDialogRef<ShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      (<any>window).ga('set', 'page', '/share');
      (<any>window).ga('send', 'pageview');
  }

  ngOnInit() {
    this.shareUrl = window.location.host + '/view?id=';
    this.messageBody = this.sharedMessage + this.shareUrl + btoa(this.data.event_id);
  }

  clicked() {
    console.log("clicked that guy")
  }

  shareWhatsapp(){
    window.location.href = "whatsapp://send?text=" + this.messageBody;
  }

  shareEmail(){
    window.location.href = "mailto:?body=" + this.messageBody;
  }

  shareSMS(){
    window.location.href = ('sms:&body=' + this.messageBody, '_self');
  }

  shareURL(){
    var copyText = this.shareUrl + btoa(this.data.event_id);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    /* Alert the copied text */
    alert("Copied the URL!");
  }

  shareWhatsappGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'Share',
      eventLabel: 'Whatsapp',
      eventAction: 'ShareWhatsappEvent',
      eventValue: 10
    });
  }

  shareEmailGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'Share',
      eventLabel: 'Email',
      eventAction: 'ShareEmailEvent',
      eventValue: 10
    });
  }

  shareUrlGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'Share',
      eventLabel: 'URL',
      eventAction: 'ShareUrlEvent',
      eventValue: 10
    });
  }


  ngOnDestroy() {
    let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
    (<any>window).ga('set', 'page', url);
    (<any>window).ga('send', 'pageview');
  }

}
