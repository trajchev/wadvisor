import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'keepHTML'})
export class KeepHTMLPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string): SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(content);

  }

}
