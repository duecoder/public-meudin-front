import { CardInvoice } from "./CardInvoice";

export class Card {
  id: number;
  userId: number;
  cardName: string;
  finalDigits: string;
  closingDay: string;
  paymentLimitDay: string;
  invoices: CardInvoice[];
  currentInvoice: CardInvoice;
  nextMonthInvoice: CardInvoice;

  constructor(
    id: number = 0,
    userId: number = 0,
    cardName: string = '',
    finalDigits: string = '',
    closingDay: string = '',
    paymentLimitDay: string = '',
    invoices: CardInvoice[] = [],
    currentInvoice: CardInvoice = new CardInvoice(),
    nextMonthInvoice: CardInvoice = new CardInvoice
  ) {
    this.id = id;
    this.userId = userId;
    this.cardName = cardName;
    this.finalDigits = finalDigits;
    this.closingDay = closingDay;
    this.paymentLimitDay = paymentLimitDay;
    this.invoices = invoices;
    this.currentInvoice = currentInvoice;
    this.nextMonthInvoice = nextMonthInvoice;
  }
}
