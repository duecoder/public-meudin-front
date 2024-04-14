import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userLoggedIn: boolean = false;

  title = 'meudin-front';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.userLoggedIn$.subscribe((loggedIn) => {
      this.userLoggedIn = loggedIn;
    });

    // Limpar localStorage ao mudar para a rota '/'
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if ((event.url === '/logout' || event.url === '/') && this.userLoggedIn) {
        this.userService.logOut();
      }
    });
  }
}
