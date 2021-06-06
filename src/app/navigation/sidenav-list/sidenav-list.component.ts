import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  links: Array<string> = ['login', 'signup', 'training', 'logout'];
  isAuth: boolean = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService,
              private router: Router) {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  ngOnInit(): void {
  }
  async ngOnDestroy() {
    this.authSubscription.unsubscribe();
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
  onToggleSideNav(link: string) {
    this.sideNavToggle.emit();
    if (link === `logout`) {
      this.authService.logout();
    } else {
      this.router.navigate([link]);
    }
  }
}
