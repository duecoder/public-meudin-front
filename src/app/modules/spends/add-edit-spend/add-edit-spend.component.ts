import { Category, convertSpendCategoryToCategory, convertCardCategoryToCategory } from 'src/app/shared/DropdownCategory';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Spend } from 'src/app/shared/Spend';
import { CategoriesService } from 'src/app/service/categories.service';
import { SpendCategory } from 'src/app/shared/SpendCategory';
import { SpendsService } from 'src/app/service/spends.service';
import { LoadingService } from 'src/app/service/loading.service';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-add-edit-spend',
  templateUrl: './add-edit-spend.component.html',
  styleUrls: ['./add-edit-spend.component.css']
})

export class AddEditSpendComponent implements OnInit, OnChanges {
  @Input() addEditModalDisplay: boolean = false;
  @Input() selectedSpend: Spend | any = null;
  @Input() spendCategories: SpendCategory[] = []
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();

  userId: number;
  actionText = 'Add';
  spend: Spend = new Spend();
  // Arrays de interfaces Category (para fornecer ao dropdown)
  categories: Category[] = [];
  cards: Category[] = [];
  // Variaveis redefinidas no onInit
  incomeRadioBtnValue: string = '';
  selectedCategoryValue: number = 0;
  selectedCategoryLabel: string = '';
  selectedCardValue: number = 0;
  selectedCardLabel: string = '';
  // NgModels
  description: string = '';
  cost: any = null;
  date: Date = new Date();
  cardSpend: boolean = false;
  // Validators
  descriptionEmpty: boolean = false;
  categoryEmpty: boolean = false;
  costEmpty: boolean = false;

  constructor(
    private spendsService: SpendsService,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private cardService: CardService
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? +userIdString : 0;
   }

  ngOnChanges(): void {
    if (this.selectedSpend) {
      this.actionText = 'Edit';
      this.spend = this.selectedSpend;
      this.incomeRadioBtnValue = this.spend.nature;
      this.selectedCategoryValue = this.spend.category;
      this.selectedCategoryLabel = this.getDescriptionForCategory(this.spend.category);
      this.description = this.selectedSpend.description;
      this.cost = this.selectedSpend.cost.toFixed(2);
      this.cardSpend = this.spend.cardId > 0;
      this.date = this.selectedSpend.date;
    } else {
      this.actionText = 'Add';
      this.spend = new Spend();
      this.incomeRadioBtnValue = 'outcome';
      this.cost = null;
      this.cardSpend = false;
      this.date = new Date();
    }
  }

  addEditSpend(): void {
    if (this.validateSpendForm()) {
      this.setSpendAndAttributes();
      this.loadingService.show();
      this.spendsService.addEditSpend(this.spend, this.selectedSpend).subscribe({
        next: (response: any) => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          const msg = this.selectedSpend == null ? 'added' : 'updated';
          this.loadingService.hide();
          this.messageService.add({ severity: 'success', summary: 'Success!', detail: `Spend ${msg} successfully`});
        },
        error: (e) => {
          this.loadingService.hide();
          this.messageService
          .add({severity: 'error', summary: 'Oops.. there was an error', detail: e.error.message});
        }
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.clickClose.emit(true);
    this.spend = new Spend();
    this.description = '';
    this.cost = null;
    this.date = new Date();
  }

  updateSelectedCategory(option: any): void {
    this.selectedCategoryValue = option.value;
    this.selectedCategoryLabel = option.label;
  }

  updateSelectedCard(option: any): void {
    this.selectedCardValue = option.value;
    this.selectedCardLabel = option.label;
  }

  validateSpendForm(): boolean {
    this.descriptionEmpty = this.description == '';
    this.costEmpty = this.cost == null;

    setTimeout(() => {
      this.descriptionEmpty = false;
      this.costEmpty = false;
    }, 2500);

    return !this.descriptionEmpty && !this.costEmpty;
  }

  setSpendAndAttributes(): void {
    if (this.selectedSpend) {
      this.spend.id = this.selectedSpend.id;
      this.spend.date = this.date != this.selectedSpend.date
                      ? this.date.toLocaleDateString('pt-BR')
                      : this.date.toString();
    } else {
      this.spend.date = this.date.toLocaleDateString('pt-BR');
    }
    this.spend.nature = this.incomeRadioBtnValue;
    this.spend.description = this.description;
    this.spend.category = this.selectedCategoryValue;
    this.spend.cost = this.cost;
    this.spend.userId = this.userId;
    this.spend.cardId = this.cardSpend ? this.selectedCardValue : 0;

  }

  getDescriptionForCategory(categoryId: number): string {
    const category = this.spendCategories.find(category => category.categoryId == categoryId);
    return category ? category.description : 'Category';
  }

  onDateInput(event: any): void {
    if (!event.target.value) {
      // Se o usuário tentar limpar o campo, redefino para o valor inicial
      this.date = new Date();
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesByUserId().subscribe((data) => {
      this.categories = data.map(convertSpendCategoryToCategory);

      this.selectedCategoryValue = this.categories[0].value;
      this.selectedCategoryLabel = this.getDescriptionForCategory(this.categories[0].value);

      this.cardService.getUserCards().subscribe((data) => {
        if (data.length > 0) {
          this.cards = data.map(convertCardCategoryToCategory);

          this.selectedCardValue = this.cards[0].value;
          this.selectedCardLabel = this.cards[0].label;
        }
      })
    });
  }
}
