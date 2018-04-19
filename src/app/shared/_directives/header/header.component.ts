import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/_services/authentication.service';
import { MatDialog } from '@angular/material';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbar: any;
  sticky: any;
  body: any;

  constructor(private router: Router, public auth: AuthenticationService, public dialog: MatDialog) {}

  ngOnInit() {
    // should be a dumb component and retrieve navigation from the component calling it
    window.addEventListener('scroll', this.scroll, true); //third parameter
    this.navbar = document.getElementById("app-header");
    this.body = document.body;
    this.sticky = this.navbar.offsetTop;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    if (window.pageYOffset > this.sticky) {
      this.navbar.classList.add("sticky")
      this.body.style.marginTop = "64px";
    } else {
      this.navbar.classList.remove("sticky");
      this.body.style.marginTop = "0px";
    }
    };

  logout(){
    //should refactor this to be the user service logging out when the button is clicked (dumb component)
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  goHome(){
    this.router.navigate(['/']);
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
