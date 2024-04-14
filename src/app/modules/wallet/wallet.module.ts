import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { CustomCurrencyPipe } from 'src/app/util/currency-pipe';
import { LoadingModule } from '../loading/loading.module';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardComponent } from './card/card.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [WalletComponent, CardComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    CustomCurrencyPipe,
    LoadingModule,
    ButtonModule,
    TagModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DividerModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [CustomCurrencyPipe, MessageService, ConfirmationService]
})
export class WalletModule { }
