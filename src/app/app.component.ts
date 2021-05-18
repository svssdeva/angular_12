import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Fitness Tracker';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
  async showEvent(event: any) {
    console.log(event);
  }
  toggleSideNav(sideNav: any) {
    sideNav.opened = !sideNav.opened;
  }


}
