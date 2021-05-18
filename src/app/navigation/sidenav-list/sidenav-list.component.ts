import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  links: Array<string> = ['login', 'signup', 'training', 'logout'];
  constructor() { }

  ngOnInit(): void {
  }
  returnIcon(link: string) {
    switch (link) {
      case 'login':
        return `face`;
      case 'signup':
        return `input`;
      case `training`:
        return `fitness_center`;
      case 'logout':
        return 'eject';
      default:
        return ``;
    }
  }
  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}
