import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  activeMenuItem: string = 'account';

  constructor(private route: ActivatedRoute) { }

  setActiveItem(item: string): void {
    this.activeMenuItem = item;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.activeMenuItem = params['selectedItem'] || 'account';
    });
  }
}
