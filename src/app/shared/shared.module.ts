import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    FlexLayoutModule,

  ],
  declarations: []
})
export class SharedModule { }
