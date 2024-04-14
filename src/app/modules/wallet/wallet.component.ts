import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardService } from 'src/app/service/card.service';
import { LoadingService } from 'src/app/service/loading.service';
import { WalletService } from 'src/app/service/wallet.service';
import { Card } from 'src/app/shared/Card';
import { WalletIncomeOutcome } from 'src/app/shared/WalletIncomeOutcome';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  userBalance: number = 0;
  monthBalance: WalletIncomeOutcome = new WalletIncomeOutcome();
  allTimeBalance: WalletIncomeOutcome = new WalletIncomeOutcome();
  balanceLoaded: boolean = false;
  thisMonthName: string = '';
  nextMonthName: string = '';
  // cards
  cards: Card[] = [];
  selectedCard: Card | any = null;
  addEditCardModal: boolean = false;

  constructor(
    private walletService: WalletService,
    private cardService: CardService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    const thisMonthDate = new Date();
    // const nextMonthDate = new Date().setMonth(thisMonthDate.getMonth() + 1);
    const options: Intl.DateTimeFormatOptions = { month: 'long' }; // 'long' para obter o nome completo do mês
    this.thisMonthName = new Intl.DateTimeFormat('en-US', options).format(thisMonthDate).toUpperCase();
    // this.nextMonthName = new Intl.DateTimeFormat('en-US', options).format(nextMonthDate).toUpperCase();
  }

  getInvoiceSeverity(closed: boolean, paid: boolean): string {
    if (closed && paid) {
      return 'success';
    } else if (closed && !paid) {
      return 'danger';
    } else {
      return 'info';
    }
  }

  getInvoiceStatus(closed: boolean, paid: boolean): string {
    if (closed && paid) {
      return 'paid';
    } else if (closed && !paid) {
      return 'closed';
    } else {
      return 'open';
    }
  }

  getCompetenceMonth(date: Date): string {
    const competence = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long' }; // 'long' para obter o nome completo do mês
    return new Intl.DateTimeFormat('en-US', options).format(competence).toUpperCase();
  }

  deleteCard(event: Event, card: Card): void {
    event.stopPropagation();
    this.confirmationService.confirm({
      message:
        `Are you sure you want to delete the <b>${card.cardName}</b> card?<br><br>
        All of its data will be lost (spend/invoice history).`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingService.show();
        this.cardService.deleteCard(card.id).subscribe({
          next: () => {
            this.loadingService.hide();
            this.messageService
            .add({severity:'success', summary: 'Success!', detail: 'Card and data deleted successfully', life: 3000});
            this.getUserBalance();
          }, error: (e) => {
            console.error(e);
            this.loadingService.hide();
            this.messageService
            .add({severity:'error', summary: 'Oops..', detail: 'Something went wrong', life: 3000});
          }
        })
      }, reject: () => this.loadingService.hide()
    });

  }

  showAddModal(): void {
    this.addEditCardModal = true;
    this.selectedCard = null;
  }

  showEditModal(card: Card): void {
    this.addEditCardModal = true;
    this.selectedCard = card;
  }

  hideAddEditModal(isClosed: boolean): void {
    this.addEditCardModal = !isClosed;
  }

  reloadCards(): void {
    this.loadingService.show();
    this.getUserBalance();
  }

  getUserBalance(): void {
    this.walletService.getUserBalance().subscribe({
      next: (balance) => {
        this.userBalance = balance;
        this.getMonthBalance();
      },
      error: (e) => {
        console.log(e);
        this.balanceLoaded = true;
      }
    });
  }

  getMonthBalance(): void {
    this.walletService.getMonthBalance().subscribe({
      next: (balance: WalletIncomeOutcome) => {
        this.monthBalance = balance;
        this.getAllTimeBalance();
      },
      error: (e) => {
        console.log(e);
        this.balanceLoaded = true;
      }
    });
  }

  getAllTimeBalance(): void {
    this.walletService.getAllTimeBalance().subscribe({
      next: (balance: WalletIncomeOutcome) => {
        this.allTimeBalance = balance;
        this.getUserCards();
      },
      error: (e) => {
        console.log(e);
        this.balanceLoaded = true;
      }
    });
  }

  getUserCards(): void {
    this.cardService.getUserCards().subscribe({
      next: (cards: Card[]) => {
        this.cards = cards;

        this.balanceLoaded = true;
        this.loadingService.hide();
      },
      error: (e) => {
        console.log(e);
        this.balanceLoaded = true;
        this.loadingService.hide();
      }
    })
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.getUserBalance();
  }
}
