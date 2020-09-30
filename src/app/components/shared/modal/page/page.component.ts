import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { PageService } from './page.service';
import { PageModel } from 'src/app/models/page.model';

@Component({
  selector: 'ba-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: PageModel;
  formatedPage: SafeHtml
  isPagePricing: boolean = false;

  constructor(
    public pageRef: MatDialogRef<PageComponent>,
    private sanitizer: DomSanitizer,
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
      this.formatedPage = this.sanitizer.bypassSecurityTrustHtml(page.content);
    });
  }

  onCloseDialog(): void {
    this.pageRef.close();
  }
}
