export class SpendCategory {
  categoryId: number;
  description: string;
  userId: number;
  userDefault: boolean;

  constructor(
    categoryId: number = 0,
    description: string = '',
    userId: number = 0,
    userDefault: boolean = false
    ) {
      this.categoryId = categoryId;
      this.description = description;
      this.userId = userId;
      this.userDefault = userDefault
    }
}
