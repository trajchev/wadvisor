import { Component, OnInit } from '@angular/core';
import { HomeModel } from '../../models/home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'ba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeItems = [];

  stats: HomeModel = {
    sports: 30,
    bookmakers: 20,
    teams: 600
  };

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getHomeStats();
  }

  getHomeStats(): void {
    this.homeService.getMatches().subscribe(res => {
      this.homeItems = res.data;
      console.log(res);
    })
  }

}
