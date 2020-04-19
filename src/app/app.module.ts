import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialDemo } from './angular-material.module';
import { UseProgressSpinnerComponent } from './use-spinner/use-progress-spinner.component';
import { ProgressSpinnerDialogComponent } from './spinner/progressSpinnerDialog.component';
@NgModule({
  declarations: [
    AppComponent,
    UseProgressSpinnerComponent,
    ProgressSpinnerDialogComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AngularMaterialDemo],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProgressSpinnerDialogComponent],
})
export class AppModule {}
