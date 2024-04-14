import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoadingModule } from '../loading/loading.module';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { InfoTabComponent } from './info-tab/info-tab.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [AccountComponent, InfoTabComponent, CategoriesComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ToastModule,
    LoadingModule,
    TooltipModule,
    ConfirmDialogModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class AccountModule { }
