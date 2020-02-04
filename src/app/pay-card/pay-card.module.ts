import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayCardComponent } from './pay-card/pay-card.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CardNumberMaskDirective } from './card-number-mask.directive';
import { CardNumHidePipe } from './card-num-hide.pipe';

@NgModule({
  declarations: [PayCardComponent,CardNumberMaskDirective, CardNumHidePipe],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,MaterialModule
  ],
  exports:[
    PayCardComponent,CardNumberMaskDirective
  ]
})
export class PayCardModule { }
