import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importe NavigationEnd
import { filter } from 'rxjs/operators'; // Importe filter
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  items: MenuItem[] = [];
  displayName: string | any = '';

  activeItem: MenuItem | undefined;

  constructor(
    private router: Router
  ) {
    // Assine os eventos de roteamento para atualizar o activeItem
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem();
    });
  }

  goHome(): void {
    this.router.navigate(['/home'])
  }

  updateActiveItem(): void {
    const currentRoute = this.router.url;
    this.activeItem = this.items.find(item => item.routerLink === currentRoute);
  }

  ngAfterViewInit() {
    this.updateActiveItem();
  }

  ngOnInit(): void {
    this.items = [
      {
        label:'Home',
        icon:'pi pi-fw pi-home',
        routerLink: '/home',
      },
      {
        label:'Spends',
        icon:'pi pi-fw pi-chart-bar',
        routerLink: '/spends'
      },
      {
        label:'Wallet',
        icon:'pi pi-fw pi-wallet',
        routerLink: '/wallet'
      },
      {
        label:'Bills',
        badge: 'SOON',
        badgeStyleClass: 'menu-badge',
        icon:'pi pi-fw pi-money-bill',
        disabled: true
      },
      {
        label:'Plans',
        badge: 'SOON',
        icon:'pi pi-fw pi-hourglass',
        disabled: true
      },
      {
        label:'Settings',
        icon:'pi pi-fw pi-cog',
        routerLink: '/settings'
      },
      {
        label:'Log Out',
        icon:'pi pi-fw pi-sign-out',
        routerLink: '/logout'
      }
    ];
    // Atualizo nome do usuario logado
    this.displayName = localStorage.getItem('displayName');
    // Atualize o activeItem ao inicializar para garantir que a rota inicial seja considerada
    this.updateActiveItem();
  }
}
