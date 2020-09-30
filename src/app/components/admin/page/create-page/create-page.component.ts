import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  isLoading: boolean = false;
  isChecked: boolean = false;
  createPageForm: FormGroup;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.createPageForm = new FormGroup ({
      'title': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'slug': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'description': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required])
    })
  }

  onCreatePage() {
    this.isLoading = true;
    this.adminService.createPage(
      this.createPageForm.value.title,
      this.createPageForm.value.slug,
      this.createPageForm.value.description,
      this.createPageForm.value.content
    ).subscribe((res: string) => {
      this.isLoading = false;
      console.log(res)
      if (res == 'success') {
        this.createPageForm.reset();
      }
    });
  }

}
