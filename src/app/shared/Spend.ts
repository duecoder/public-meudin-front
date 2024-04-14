export class Spend {
  id: number;
  userId: number;
  nature: string;
  description: string;
  category: number;
  cost: any;
  date: string;
  cardId: number;
  paid: boolean;
  invoiceId: number;

  constructor(
    id: number = 0,
    userId: number = 1,
    nature = '',
    description: string = '',
    category: number = 0,
    cost: any = null,
    date: string = '',
    cardId: number = 0,
    paid: boolean = false,
    invoiceId: number = 0
  ) {
    this.id = id;
    this.userId = userId;
    this.nature = nature;
    this.description = description;
    this.category = category;
    this.cost = cost;
    this.date = date;
    this.cardId = cardId;
    this.paid = paid;
    this.invoiceId = invoiceId
  }
}
