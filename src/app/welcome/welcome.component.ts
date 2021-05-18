import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  content: Array<{title: string, desc: string}> = [
    {
      title: `Activity`,
      desc: `Stay Active and enjoy better health and more fun!`
    },
    {
      title: `Community`,
      desc: `Get to know other people who share your passion!`
    },
    {
      title: `Challenges`,
      desc: `Never Stop! Dive into challenges every day`
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
