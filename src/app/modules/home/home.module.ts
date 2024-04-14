import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { CustomCurrencyPipe } from 'src/app/util/currency-pipe';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToastModule,
    SkeletonModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    AccordionModule,
    ChartModule,
    CustomCurrencyPipe,
    CalendarModule,
    FormsModule,
    TagModule,
    LoadingModule
  ],
  providers: [MessageService]
})
export class HomeModule { }
