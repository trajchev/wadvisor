import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavMainService } from './nav-main.service';
import { FlatMenuNode } from 'src/app/models/flatMenuNode.model';
import { MenuNode } from 'src/app/models/menuNode';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'ba-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {

  private userRole: string;

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

  constructor(
    private router: Router,
    private navService: NavMainService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.navService.getNavData().subscribe((data: MenuNode[]) => this.dataSource.data = data);
  }

  ngOnInit(): void {}

  onNavigate(key: string) {
    this.userRole = this.authService.getLevel();
    this.router.navigate([`/matches/${key}`]).then((res:boolean) => {
      if (res && window.innerWidth < 768) {
        this.showNavigation = false;
      }
    });

    if (this.userRole === 'unconfirmed') {
      this.openConfirmationDialog();
    }
  }

  toggleNavigation(): void {
    this.showNavigation = !this.showNavigation;
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '98%',
      maxWidth: '640px',
      data: {
        type: 'confirm',
        title: 'Please confirm your email address',
        message: 'Your account has not been confirmed. Please confirm it by going to the email account which you provided when signing up. Click the button/link in the confirmation email we sent.'
      }
    });
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
