import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { TimelineEvent } from 'src/app/shared/TimelineEvent';
import { Router } from '@angular/router';
import { WalletIncomeOutcome } from 'src/app/shared/WalletIncomeOutcome';
import { WalletService } from 'src/app/service/wallet.service';
import { SpendsService } from 'src/app/service/spends.service';
import { HomeSpends } from 'src/app/shared/HomeSpends';
import { ChartData } from 'src/app/shared/ChartData';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentMonthName: string = '';
  // Balance data
  userBalance: number = 0;
  monthBalance: WalletIncomeOutcome = new WalletIncomeOutcome();
  // Spends data
  spendsData: HomeSpends = new HomeSpends();
  // Chart data
  chartDate: Date = new Date();
  chartDateStr: string = '';
  data: any;
  options: any;
  chartLoaded: boolean = true;
  colorIndex: number = 0;
  // Get started tab
  index: number = 0;
  events: TimelineEvent[] = [
    {
      icon: 'pi pi-fw pi-cog',
      title: 'Setup your categories',
      subtitle: `Spends categories`,
      content: 'We have added some default ones, but encourage you to create as many as you want! It will you help in your future analysis.',
      url: '/settings'
    },
    {
      icon: 'pi pi-fw pi-wallet',
      title: 'Manage your cards',
      subtitle: 'And your balance',
      content: 'Add/edit your cards with its crucial data, see its invoices and how it affects your balance.',
      url: '/wallet'
    },
    {
      icon: 'pi pi-fw pi-chart-bar',
      title: 'Start adding your spends',
      subtitle: 'And have full control!',
      content: 'With categories and cards ready, you can start adding your spends with better control of them!',
      url: '/spends'
    },
  ];

  constructor(
    private router: Router,
    private walletService: WalletService,
    private spendService: SpendsService,
    private loadingService: LoadingService
    ) {
      const thisMonthDate = new Date();
      const options: Intl.DateTimeFormatOptions = { month: 'long' }; // 'long' para obter o nome completo do mês
      this.currentMonthName = new Intl.DateTimeFormat('en-US', options).format(thisMonthDate).toUpperCase();
      this.data = {
        labels: [''],
        datasets: []
      }
      this.options = {
        scales: {
          x: { grid: { color: 'rgba(199,213,224,.1)' }, },
          y: { grid: { color: 'rgba(199,213,224,.1)', }, },
        },
        elements: {
          area: { backgroundColor: 'rgba(199,213,224,.1)' },
        },
      };
  }

  setActiveIndex() {
    this.index = this.index > 0 ? 0 : 1;
    const boolStr: string = this.index > 0 ? 'false' : 'true';
    localStorage.setItem("introBool", boolStr);
  }

  redirect(url: string): void {
    if (url.includes('settings')) {
      this.router.navigate([url], { queryParams: { selectedItem: 'categories' } });
    } else {
      this.router.navigate([url]);
    }
  }

  getBarColor(): string {
    const colors = [
      '#171a21',
      '#2a475e',
      '#66c0f4',
      '#c7d5e0'
    ];
    // Retorna a cor atual e avança para a próxima
    const currentColor = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length;

    return currentColor;
  }

  onChangeChartMonth(event: any): void {
    const selectedDate: Date = event;
    const date = this.getMonthYearString(selectedDate);
    this.getChartData(date);
  }

  getMonthYearString(date: Date): string {
    // Obter o mês e o ano da data selecionada
    const month: number = date.getMonth() + 1; // Adicionar 1 porque os meses são zero-based
    const year: number = date.getFullYear();
    // Formatando o mês e ano como "mm-yyyy"
    return `${month.toString().padStart(2, '0')}-${year.toString()}`;
  }

  getChartData(date: string): void {
    this.spendService.getChartData(date).subscribe({
      next: (data: ChartData[]) => {
        const firstDataItem = data[0];
        // Verifico se há dados antes de acessar a propriedade monthFilter
        const monthLabels = firstDataItem ? [firstDataItem.monthFilter] : [];
        this.data = {
          labels: monthLabels,
          datasets: data.map(item => ({
            label: item.categoryDescription,
            data: [item.categorySum],
            backgroundColor: this.getBarColor(),
          })),
        };
        this.chartLoaded = true;
        this.loadingService.hide();
      }
    })
  }

  getHomeSpendsDto(): void {
    this.spendService.getHomeSpendsDto().subscribe({
      next: (dto: HomeSpends) => {
        this.spendsData = dto;
        this.getChartData(this.getMonthYearString(this.chartDate));
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getUserBalance(): void {
    this.walletService.getUserBalance().subscribe({
      next: (balance: number) => {
        this.userBalance = balance;
        this.getHomeSpendsDto();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getMonthBalance(): void {
    this.walletService.getMonthBalance().subscribe({
      next: (balance: WalletIncomeOutcome) => {
        this.monthBalance = balance;
        this.getUserBalance();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    const bool = localStorage.getItem("introBool");
    this.index = bool === 'false' ? 1 : 0;

    this.loadingService.show();
    this.getMonthBalance();
  }
}
