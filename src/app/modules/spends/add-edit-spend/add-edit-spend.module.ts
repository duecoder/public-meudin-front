import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSpendComponent } from './add-edit-spend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [AddEditSpendComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    TagModule,
    DropdownModule,
    ReactiveFormsModule,
    TooltipModule,
    ButtonModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    InputSwitchModule
  ],
  exports: [AddEditSpendComponent]
})
export class AddEditSpendModule { }
