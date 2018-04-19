import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateComponent } from '../shared/_directives/create/create.component';
import { EventService } from '../core/_services/event.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: any;

  constructor(private router: Router,public dialog: MatDialog, private eventService: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        if(params.id && params.id != ''){
          console.log(params)
          this.getEvent(params.id);
        } else {
          this.router.navigate(['/view']);
        }

    });
  }

  getEvent(id: any){
    this.eventService.getById(atob(String(id)))
        .subscribe(response => {
          console.log(response)
          this.event = response.events[0]
          console.log(this.event)
        })
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
