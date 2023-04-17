import { Component, Input } from '@angular/core';

@Component({
  selector: 'csp-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input('errorText') errorText = '';
}

