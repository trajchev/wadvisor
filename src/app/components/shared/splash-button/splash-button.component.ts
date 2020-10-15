import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ba-splash-button',
  templateUrl: './splash-button.component.html',
  styleUrls: ['./splash-button.component.scss']
})
export class SplashButtonComponent implements OnInit {

  @Input() text: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
