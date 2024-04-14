import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';

import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { CpfMaskDirective } from 'src/app/util/cpf-mask.directive';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';

@NgModule({
  declarations: [
    RegisterComponent,
    PersonalComponent,
    LoginComponent,
    CpfMaskDirective,
  ],
  imports: [
    CommonModule,
    StepsModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    LoadingModule,
    ProgressSpinnerModule
  ],
  exports: [
    RegisterComponent,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    LoadingComponent,
    PersonalComponent,
    LoginComponent
  ]
})
export class RegisterModule { }
