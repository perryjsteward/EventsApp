import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateComponent } from '../shared/_directives/create/create.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  createEventGA(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'Home',
      eventLabel: 'Create event',
      eventAction: 'CreateEvent',
      eventValue: 10
    });
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
