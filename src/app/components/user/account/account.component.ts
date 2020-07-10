import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageComponent } from '../../shared/modal/page/page.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/modal/snackbar/snackbar.component';
import { mimeType } from '../mime-type.validator';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: UserModel;
  recruitmentLink: string = `${window.location.protocol}//${window.location.hostname}/auth/register/`;
  editMode: boolean = false;
  imagePicked: boolean = false;
  imageForm: FormGroup;
  imagePreview;
  durationInSeconds = 3;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMyData();
    this.imageForm = new FormGroup({
      'photo': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  getMyData() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar();
  }

  onStartEdit() {
    this.editMode = !this.editMode;
  }

  onCancelEdit() {
    this.editMode = false;
    this.imagePicked = false;
    this.imageForm.patchValue({photo: null});
    this.imageForm.get('photo').updateValueAndValidity();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({photo: file});
    this.imageForm.get('photo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onImageSave() {
    this.userService.uploadPhoto(this.imageForm.value.photo).subscribe(user => {
      this.user.photo = `${environment.BASE_URL}img/users/${user.photo}`;
    });
    this.imagePicked = false;
    this.editMode = false;
  }

  openPage(slug: string) {
    const pageRef = this.dialog.open(PageComponent, {
      width: '94%',
      maxWidth: '680px',
      data: { slug: slug }
    });

  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: 'Link Copied'
    });
  }

}
