import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, MatGridListModule],
    declarations: [
        AppComponent, 
        HomeComponent
    ],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})

export class AppModule { }