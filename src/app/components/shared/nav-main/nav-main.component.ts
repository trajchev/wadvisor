import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavMainService } from './nav-main.service';
import { FlatMenuNode } from 'src/app/models/flatMenuNode.model';
import { MenuNode } from 'src/app/models/menuNode';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {

  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.sports && node.sports.length > 0,
      title: node.title,
      details: node.details,
      key: node.key,
      level: level,
    };
  }

  panelOpenState: boolean = false;
  showNavigation: boolean = true;

  treeControl = new FlatTreeControl<FlatMenuNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.sports);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatMenuNode) => node.expandable;

  constructor(private router: Router, private navService: NavMainService) {
    this.navService.getNavData().subscribe((data: MenuNode[]) => this.dataSource.data = data);
   }

  ngOnInit(): void {}

  onNavigate(key: string) {
    this.router.navigate([`/matches/${key}`]).then((res:boolean) => {
      if (res && window.innerWidth < 768) {
        this.showNavigation = false;
      }
    })
  }

  toggleNavigation(): void {
    this.showNavigation = !this.showNavigation;
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
     if (window.innerWidth > 768)  {
      this.panelOpenState = true;
      this.showNavigation = true;
     } else {
      this.panelOpenState = false;
      this.showNavigation = false;
     };
  }

}
