export class WalletIncomeOutcome {
  income: number;
  outcome: number;

  constructor(
    income: number = 0,
    outcome: number = 0
  ) {
    this.income = income;
    this.outcome = outcome;
  }
}
