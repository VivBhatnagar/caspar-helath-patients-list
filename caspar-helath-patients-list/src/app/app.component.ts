import { Component, OnInit } from '@angular/core';
import { PatientsService } from './patients.service';

@Component({
  selector: 'csp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 public title = 'Caspar Health';

  constructor(){}
}
