import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  disclaimer: any;
  disclaimerFlag = false;
  extraOptions = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {

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

}
