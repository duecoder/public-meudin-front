import { CategoriesService } from './../../service/categories.service';
import { SpendsService } from './../../service/spends.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardService } from 'src/app/service/card.service';
import { LoadingService } from 'src/app/service/loading.service';
import { Card } from 'src/app/shared/Card';
import { Spend } from 'src/app/shared/Spend';
import { SpendCategory } from 'src/app/shared/SpendCategory';

@Component({
  selector: 'app-spends',
  templateUrl: './spends.component.html',
  styleUrls: ['./spends.component.css']
})
export class SpendsComponent {
  addEditModalDisplay: boolean = false;
  spends: Spend[] = [];
  spendCategories: SpendCategory[] = [];
  spend: Spend = new Spend();
  // Spend p/ enviar /p edit
  selectedSpend: Spend | any = null;
  // Spends p/ deleção
  selectedSpends: Spend[] = [];
  // Array de ids dos spends acima
  selectedIds: number[] = [];
  // Cards do usuário
  userCards: Card[] = [];

  constructor(
    private spendsService: SpendsService,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.getSpendsCategoriesList();
  }

  showAddModal(): void {
    this.addEditModalDisplay = true;
    this.selectedSpend = null;
  }

  showEditModal(spend: Spend): void {
    this.addEditModalDisplay = true;
    this.selectedSpend = spend;
  }

  hideAddEditModal(isClosed: boolean): void {
    this.addEditModalDisplay = !isClosed;
  }

  getDescriptionForCategory(categoryId: number): string | undefined {
    const category = this.spendCategories.find(category => category.categoryId == categoryId);
    return category ? category.description : 'Category not found';
  }

  getCardNameAndDigits(cardId: number): string | undefined {
    const card = this.userCards.find(card => card.id == cardId);
    return card ? `${card.cardName} / ${card.finalDigits}` : 'Card not found';
  }

  reloadSpends(): void {
    // this.getSpendsList();
    this.getSpendsCategoriesList();
  }

  deleteSpend(spend: Spend): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete <b>' + spend.description + '</b>?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spendsService.deleteSpend(spend.id)
        .subscribe({
          next: () => {
            this.spend = new Spend();
            this.messageService.add({severity:'success', summary: 'Success!', detail: 'Spend Deleted', life: 3000});
            this.getSpendsList();
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Oops..', detail: 'Something went wrong', life: 3000});
          }
        })
      }
    });
  }

  deleteSelectedSpends(): void {
    for (const spend of this.selectedSpends) {
      if (spend.cardId > 0) {
        this.messageService.add({severity:'warn', summary: 'Warning', detail: `You can't delete multiple card spends`, life: 3000});
        return;
      }
      this.selectedIds.push(spend.id);
    }
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected spends?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spendsService.deleteSpends(this.selectedIds).subscribe({
          next: (response: any) => {
            this.selectedSpends = [];
            this.messageService.add({severity:'success', summary: 'Success!', detail: 'Spends Deleted', life: 3000});
            this.spendsService.getSpends().subscribe((data) => {
              this.spends = data
            });
          },
          error: (error: any) => {
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Oops..', detail: 'Something went wrong', life: 3000});
          }
        });
      }
    });
  }

  getUserCards(): void {
    this.cardService.getUserCards().subscribe((data) => {
      this.userCards = data;
      this.loadingService.hide();
    })
  }

  getSpendsList(): void {
    this.spendsService.getSpends().subscribe((data) => {
      this.spends = data;
      this.getUserCards();
    });
  }

  getSpendsCategoriesList(): void {
    this.loadingService.show();
    this.categoryService.getCategoriesByUserId().subscribe((data) => {
      this.spendCategories = data
      this.getSpendsList();
    });
  }
}
