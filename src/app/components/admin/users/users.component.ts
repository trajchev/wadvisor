import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { AdminService } from '../admin.service';
import { UserModel } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ba-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean = false;

  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  users: UserModel[] = null;
  dataSource;
  emailForm: FormGroup;
  sendResultMsg: string = null;

  displayedColumns: string[] = ['select', 'id', 'username', 'email', 'role', 'recruits'];
  selection = new SelectionModel<UserModel>(true, []);

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((users: UserModel[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.emailForm = new FormGroup({
      'subject': new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows = 5
    if (this.dataSource) {
      numRows = this.dataSource.data.length;
    }
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(user => this.selection.select(user));
  }

  onSendEmail() {
    const selectedUsers = this.selection.selected;
    const subject = this.emailForm.value.subject;
    if (selectedUsers.length > 0 && this.emailForm.value.subject) {
      this.isLoading = true;
      this.adminService.sendEmail(subject, this.selection.selected).subscribe((res: {status: string, msg: string}) => {
        this.isLoading = false;
        this.sendResultMsg = res.msg;
      })
    }
  }

  checkboxLabel(user?: UserModel): string {
    if (!user) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(user) ? 'deselect' : 'select'} user ${user.id + 1}`;
  }

}
