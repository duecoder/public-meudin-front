import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.css']
})
export class ApiStatusComponent {
  @Input() waitingAPIStatus: boolean = false;
}
