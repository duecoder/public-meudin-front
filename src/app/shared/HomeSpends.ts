export class HomeSpends {
  mostExpensive: number;
  highestIncome: number;
  totalSpends: number;

  constructor(
    mostExpensive: number = 0,
    highestIncome: number = 0,
    totalSpends: number = 0
  ) {
    this.mostExpensive = mostExpensive;
    this.highestIncome = highestIncome;
    this.totalSpends = totalSpends;
  }
}
