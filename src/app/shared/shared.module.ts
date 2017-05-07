import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyConverterPipe } from './pipes/currency-converter.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,


  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    FlexLayoutModule,
    CurrencyConverterPipe

  ],
  declarations: [CurrencyConverterPipe]
})
export class SharedModule { }
