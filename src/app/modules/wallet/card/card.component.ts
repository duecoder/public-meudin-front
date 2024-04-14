import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Card } from 'src/app/shared/Card';
import { CardInvoice } from 'src/app/shared/CardInvoice';
import { LoadingService } from 'src/app/service/loading.service';
import { CardService } from 'src/app/service/card.service';
import { ResponseJson } from 'src/app/shared/ResponseJson';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // '../../spends/add-edit-spend/add-edit-spend.component.css'
})
export class CardComponent implements OnChanges {
  @Input() addEditCardModal: boolean = false;
  @Input() selectedCard: Card | any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  actionText: string = '';
  // Form
  userId: number = 0;
  card: Card = new Card();
  // Validation
  cardNameEmpty: boolean = false;
  digitsEmpty: boolean = false;
  closingDayEmpty: boolean = false;
  limitDayEmpty: boolean = false;

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService,
    private cardService: CardService,
    private confirmationService: ConfirmationService
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? +userIdString : 0;
  }

  ngOnChanges(): void {
    if (this.selectedCard) {
      this.card = this.selectedCard;
      this.actionText = 'View/Edit ';
    } else {
      this.card = new Card();
      this.card.userId = this.userId;
      this.actionText = 'Add ';
    }
  }

  addEditCard(): void {
    this.loadingService.show();
    if (this.validateForm()) {
      this.cardService.addEditCard(this.card, this.selectedCard).subscribe({
        next: (response: ResponseJson) => {
          this.closeModal();
          this.clickAddEdit.emit(true);
          this.loadingService.hide();
          this.messageService
          .add({severity: 'success', summary: 'Success!', detail: response.message});
        }, error: (e) => {
          console.log(e.error);
          this.closeModal();
          this.loadingService.hide();
          this.messageService
          .add({severity: 'error', summary: 'Oops..', detail: 'Something went wrong'});
        }
      })
    } else {
      this.loadingService.hide();
      this.messageService
      .add({severity: 'error', summary: 'Warning', detail: 'Enter required data'});
    }
  }

  closeModal(): void {
    this.clickClose.emit(true);
    this.card = new Card();
  }

  payInvoice(invoice: CardInvoice): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to pay this invoice?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingService.show();
        this.cardService.payCardInvoice(invoice.id).subscribe({
          next: (response: ResponseJson) => {
            this.clickAddEdit.emit(true);
            this.closeModal();
            this.loadingService.hide();
            this.messageService
            .add({severity: 'success', summary: 'Success!', detail: response.message});
          }, error: (e) => {
            console.error(e);
            this.closeModal();
            this.loadingService.hide();
            this.messageService
            .add({severity: 'error', summary: 'Oops..', detail: 'Something went wrong'});
          }
        })
      }, reject: () => this.loadingService.hide()
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const elementId = input.id;
    const maxLength = (elementId === 'final-digits') ? 4 : 2;

    if (input.value.length >= maxLength) {
      event.preventDefault();
    }
  }

  validateForm(): boolean {
    this.cardNameEmpty = this.card.cardName == '';
    this.digitsEmpty = this.card.finalDigits == '';
    this.closingDayEmpty = this.card.closingDay == '';
    this.limitDayEmpty = this.card.paymentLimitDay == '';

    setTimeout(() => {
      this.cardNameEmpty = false;
      this.digitsEmpty = false;
      this.closingDayEmpty = false;
      this.limitDayEmpty = false;
    }, 2500);

    return !this.cardNameEmpty && !this.digitsEmpty
            && !this.closingDayEmpty && !this.limitDayEmpty;
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
}
