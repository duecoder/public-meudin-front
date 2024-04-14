
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './index.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IndexRoutingModule } from './index-routing.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoadingModule } from '../loading/loading.module';
import { RegisterModule } from '../register/register.module';
import { ApiStatusComponent } from './api-status/api-status.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [IndexComponent, ApiStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    IndexRoutingModule,
    HomeRoutingModule,
    ToastModule,
    RegisterModule,
    LoadingModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService]
})
export class IndexModule { }
