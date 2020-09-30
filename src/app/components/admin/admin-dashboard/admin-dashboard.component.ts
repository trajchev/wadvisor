import { Component, OnInit } from '@angular/core';
import { PageModel } from 'src/app/models/page.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'ba-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  pages: PageModel[] = null;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    this.adminService.getPages().subscribe((res: PageModel[]) => {
      console.log(res);
      this.pages = res;
    })
  }

}
