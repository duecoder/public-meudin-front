export class CardInvoice {
  id: number;
  cardId: number;
  competence: Date;
  amount: number;
  closed: boolean;
  paid: boolean;

  constructor(
    id: number = 0,
    cardid: number = 0,
    competence: Date = new Date(),
    amount: number = 0,
    closed: boolean = false,
    paid: boolean = false
  ) {
    this.id = id;
    this.cardId = cardid;
    this.competence = competence;
    this.amount = amount;
    this.closed = closed;
    this.paid = paid;
  }
}
