import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { MenuModule } from '../menu/menu.module';
import { CustomCurrencyPipe } from 'src/app/util/currency-pipe';
import { SpendsComponent } from './spends.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SpendsRoutingModule } from './spends-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { LoadingComponent } from '../loading/loading.component';
import { AddEditSpendModule } from './add-edit-spend/add-edit-spend.module';

@NgModule({
  declarations: [SpendsComponent],
  imports: [
    SpendsRoutingModule,
    CommonModule,
    TableModule,
    ToolbarModule,
    MenuModule,
    ToastModule,
    LoadingModule,
    AddEditSpendModule,
    ConfirmDialogModule,
    TagModule,
    CustomCurrencyPipe
  ],
  exports: [LoadingComponent],
  providers: [CustomCurrencyPipe, ConfirmationService, MessageService]
})
export class SpendsModule { }
