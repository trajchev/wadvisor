import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PageService } from './page.service';
import { PageModel } from 'src/app/models/page.model';

@Component({
  selector: 'ba-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: PageModel;
  isPagePricing: boolean = false;

  constructor(
    public pageRef: MatDialogRef<PageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { slug: string, last_four: string },
    private pageService: PageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onLoadPage();
  }

  onLoadPage(): void {
    if (this.data.slug === 'pricing') {
      this.isPagePricing = true;
    }
    this.pageService.getPage(this.data.slug).subscribe((page: PageModel) => {
      this.page = page;
      console.log(page.content);
      this.page.content = '<h4>Hello World</h4>';
    });
  }

  onCloseDialog(): void {
    this.pageRef.close();
  }
}
