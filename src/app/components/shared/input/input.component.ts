import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() inputType: string;
  @Input() placeholder: string;

  hide: boolean = true

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('visibility', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
  }

  ngOnInit(): void { }

  showErrorMessage() {
    if (this.inputType === 'email') {
      return 'Please enter a valid email'
    } else if (this.inputType === 'password') {
      return 'Please enter a valid password'
    }
    return 'Please enter a valid value';
  }

}
