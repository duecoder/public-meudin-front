import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/service/categories.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ResponseJson } from 'src/app/shared/ResponseJson';
import { SpendCategory } from 'src/app/shared/SpendCategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../account.component.css']
})
export class CategoriesComponent implements OnInit {
  // ID usuário logado p/ fazer requisições
  userId: number;
  categories: SpendCategory[] = [];
  newCategory: string = '';
  newCategoryEmpty: boolean = false;
  itemsPerRow = 3; // Número de itens por linha

  constructor(
    private messageService: MessageService,
    private categoryService: CategoriesService,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? +userIdString : 0;
  }

  getUserCategories(): void {
    this.loadingService.show();
    this.categoryService.getCategoriesByUserId().subscribe((data) => {
      this.categories = data;
      this.loadingService.hide();
    });
  }

  addCategory(): void {
    if (this.newCategory == '') {
      this.newCategoryEmpty = true;
      this.messageService.add({
        severity: 'warn', summary: 'Warning', detail: 'Enter the category description'
      });

      setTimeout(() => {
        this.newCategoryEmpty = false;
      }, 3000);
    } else {
      this.doAddCategory();
    }
  }

  doAddCategory(): void {
    this.loadingService.show();
    this.categoryService.registerNewCategory(this.userId, this.newCategory).subscribe({
      next: (response: ResponseJson) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success', summary: 'Success!', detail: response.message
          });
          this.newCategory = '';
          this.getUserCategories();
          this.loadingService.hide();
        } else {
          this.messageService.add({
            severity: 'error', summary: 'Oops..', detail: response.message
          });
          this.loadingService.hide();
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error', summary: 'Oops..', detail: 'Something went wrong'
        });
        this.loadingService.hide();
      }
    })
  }

  deleteCategory(id: number, description: string, userDefault: boolean): void {
    if (userDefault) {
      this.messageService.add({
        severity: 'warn', summary: 'Oops..', detail: `You can't delete the default category`
      });
      return;
    }
    this.categoryService.existsByUserAndCategoryId(id).subscribe({
      next: (exists: boolean) => {
        let message = `Are you sure you want to delete <b>${description}</b>?<br>`;

        if (exists) {
          message += '<br>All your spends with this category will be set to the default category.';
        }
        this.confirmationService.confirm({
          message: message,
          header: 'Delete Category',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doDeleteCategory(id);
          }
        })
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  doDeleteCategory(id: number): void {
    this.loadingService.show();
    this.categoryService.deleteCategory(id).subscribe({
      next: (response: ResponseJson) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success', summary: 'Success!', detail: response.message
          });
          this.getUserCategories();
          this.loadingService.hide();
        } else {
          this.messageService.add({
            severity: 'error', summary: 'Oops..', detail: response.message
          });
          this.loadingService.hide();
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error', summary: 'Oops..', detail: 'Something went wrong'
        });
        this.loadingService.hide();
      }
    })
  }

  calculateGridRowStart(index: number): number {
    return Math.floor(index / this.itemsPerRow) + 1;
  }

  calculateGridColumnStart(index: number): number {
    return (index % this.itemsPerRow) + 1;
  }

  ngOnInit(): void {
    this.getUserCategories();
  }
}
