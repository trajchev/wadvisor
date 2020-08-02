import { Component, OnInit } from '@angular/core';
import { HomeModel } from '../../models/home.model';

@Component({
  selector: 'ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stats: HomeModel = {
    sports: 30,
    bookmakers: 20,
    teams: 600
  };

  constructor() { }

  ngOnInit(): void { }

}
